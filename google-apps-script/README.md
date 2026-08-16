# Al Sandouq Google Sheets quote-form setup

The website sends quote requests to the Vercel `/api/submit-quote` proxy. The proxy forwards them to this Apps Script, which writes to the Al Sandouq spreadsheet and sends an email notification.

## One-time Google setup

1. Sign into the Al Sandouq Google account.
2. Create a spreadsheet and a tab named `Quote Requests`.
3. Put these headers in row 1:

   `Timestamp | Name | Email | Phone | Company | Message | Source`

4. Open `Extensions > Apps Script` and replace the editor contents with `Code.gs` from this folder.
5. Under **Project Settings > Script properties**, add:
   - Property: `QUOTE_FORM_SECRET`
   - Value: the same long random value used for Vercel's `GOOGLE_SCRIPT_SECRET`
6. Deploy as a **Web app**:
   - Execute as: **Me** (the Al Sandouq Google account)
   - Who has access: **Anyone**
7. Copy the deployment URL into Vercel as `GOOGLE_APPS_SCRIPT_URL`.

The notification recipient is currently `amitjain@alsandouqalahmar.com` in `Code.gs`. Change it if the Al Sandouq receiving address is different.
