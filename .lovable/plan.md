# Security verification pass — findings and proposed fixes

Nothing was changed. Below is exactly what was checked, what was found, and the only changes I recommend.

## 1. send-transactional-email function / Resend key

Checked: the deployed function list for the project, a live request to `/functions/v1/send-transactional-email`, and the project's stored secrets.

Finding: **the function does not exist.** The live endpoint returns `404 NOT_FOUND`, and the only deployed function is `submit-quote`. There is also no Resend (or any email-provider) API key among the project secrets — the stored secrets are only the platform defaults (`LOVABLE_API_KEY`, `SUPABASE_*`). So there is no hardcoded key to rotate; there is no key at all.

Security impact: none. Functional impact: real — `submit-quote` stores the enquiry and then calls a function that doesn't exist, logs the error, and still returns success. **No quote email has ever reached amitjain@alsandouqalahmar.com.** The only copy of an enquiry is the database row.

## 2. Row Level Security on quote_requests, in production

Checked live, not from the migration file: RLS flag on the table, every policy, table privileges, and real HTTP calls to the Data API using the public key.

- RLS is enabled on `public.quote_requests`.
- Exactly one policy exists: a read policy for `authenticated` whose condition is `false`. There is no INSERT, UPDATE or DELETE policy for anyone.
- Live probes with the public key: read returns an empty set, insert is rejected with `42501 new row violates row-level security policy`, delete affects zero rows (row count before and after is unchanged: 1 row, unmodified).
- Server-side writes work because the service role bypasses RLS.

Result: the table is effectively closed to the public and writable only server-side, as intended.

One hardening gap worth closing: the table still carries full table-level privileges for `anon` and `authenticated` (select/insert/update/delete). RLS is currently the only thing standing between the public key and the data. Belt-and-braces would be to revoke those grants so a future accidental permissive policy can't expose enquiries.

## 3. VITE_SUPABASE_PUBLISHABLE_KEY

Checked: the value in `.env`, the value reported by the project itself, and its behaviour against the Data API.

The key is `sb_publishable_…`. Secret keys use the `sb_secret_` prefix; legacy service-role keys are JWTs beginning `eyJ`. It behaves as `anon` in the live probes above (blocked by RLS), which a service-role key would not be. Confirmed correct — no service-role key is exposed in the frontend.

## 4. Other functions, cron jobs, webhooks

Checked: deployed function list, installed database extensions, database functions and triggers.

- Only one deployed edge function: `submit-quote`, whose source is in the repo and reads all credentials via `Deno.env.get(...)` — no hardcoded secrets.
- `pg_cron` and `pg_net` are not installed, so there are no scheduled jobs and no database webhooks.
- No database functions or triggers exist.
- Note: `api/submit-quote.ts` and `google-apps-script/` are leftovers from the earlier Vercel/Apps Script approach. They read their secrets from env vars (nothing hardcoded), but they are dead code on this stack and the frontend no longer calls them.

## 5. CORS

Checked: live preflight response from `submit-quote`.

It returns `access-control-allow-origin: *`. Assessment: acceptable here, and not a service-role escalation path. The function is a public, unauthenticated contact form — it must accept browser calls, it never returns data, and the service role is used only inside the function to insert one validated row. Locking to a single origin would not stop abuse (any script can POST directly, bypassing CORS entirely); the existing protections against that are the Zod validation, honeypot, 12 KB body cap, per-IP 3-per-minute throttle, and 2-minute duplicate collapse. There is no cookie or credentialed session for `*` to leak.

## Proposed changes (none applied yet)

1. **Make enquiry email actually work.** Set up email sending for the project, then have `submit-quote` send the notification itself instead of invoking a non-existent function — reply-to set to the enquirer, storage-first so an email failure never loses the enquiry. This requires a verified sender domain you control (e.g. `notify.alsandouqalahmar.com`) and adding the DNS records it shows.
2. **Interim safety net:** until email is live, surface stored enquiries to you (a simple export, or a daily digest once email works). At minimum, I can hand you the one stored enquiry now.
3. **Revoke the redundant `anon`/`authenticated` grants** on `quote_requests` (migration), leaving service-role-only access plus the existing RLS.
4. **Delete the dead `api/submit-quote.ts` and `google-apps-script/` files** so there is no stale credential-handling path in the repo.

Say which of these you want and I'll implement them.
