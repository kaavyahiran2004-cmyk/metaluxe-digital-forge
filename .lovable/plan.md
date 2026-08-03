# Industrial Ledger Redesign + Working Quote Form

Rebuild the site's look around the uploaded "Industrial Ledger" design system, keep every existing section and all copy, and make the quote form actually deliver enquiries to amitjain@alsandouqalahmar.com.

## 1. Design overhaul

Replace the current dark "deep space / glassmorphism" theme with the tactile industrial aged-paper theme:

- Aged paper background (#fff8f0 family), charcoal black structure, rust iron (#984729) and burnt brass accents.
- Fonts: Domine (headings), Literata (body), JetBrains Mono (labels, stats, prices, table data).
- Sharp corners everywhere (0px radius), 1-2px charcoal borders, hard offset shadows instead of blurred glows, rivet dots at container corners, subtle paper-grain overlay.
- Cards get inverted "nameplate" headers; buttons are solid charcoal turning rust on hover; inputs are etched with a 2px bottom border and mono labels above.
- Sections updated one by one with identical structure and content: Navigation, Hero (stats become stamped mono tiles), Products, Live Prices (heavy-ruled data table), About, Certificates, Contact, Footer.
- All colors go through semantic tokens in `index.css` / `tailwind.config.ts` — no hardcoded color classes in components.

## 2. Working quote form

Enquiries need a backend, so this adds Lovable Cloud (database + server functions) to the project:

- Form submissions are validated, saved to a `quote_requests` table (so nothing is ever lost), and emailed to amitjain@alsandouqalahmar.com.
- The email includes name, email, phone, company and message, with reply-to set to the sender so replies go straight back to the enquirer.
- Real success/error states in the UI instead of the current fake timeout.

Email delivery requires a verified sender domain you own (e.g. `notify.alsandouqalahmar.com`). After approval I'll open the email setup step; you add the DNS records shown, and sending goes live once verified. Until verification completes, submissions are still stored safely in the database.

## 3. Contact details

- "Visit Us" becomes: Industrial Area 10, Sharjah, UAE.
- The Working Hours card is removed from the contact section (and the hours line in the footer, if present).

## Technical notes

- `src/index.css` + `tailwind.config.ts`: new HSL token set, mono/serif font families, grain + rivet utilities, hard-shadow utilities; remove glow/glass utilities.
- `index.html`: swap Inter for Domine + Literata + JetBrains Mono.
- Cloud: `quote_requests` table with RLS (public insert only, no public read) plus explicit grants; edge function `send-quote-request` validates with Zod, inserts the row, and sends the email through Lovable's email infrastructure.
- `Contact.tsx` rewritten to call the edge function; address updated; working-hours block deleted.
