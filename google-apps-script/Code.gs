const SHEET_NAME = "Quote Requests";
const SPREADSHEET_ID = "1Wdj4uDFpy1Gv_vFXxOpvZ0Wz3JTXnX3t1Fg-I3JK9c8";
const NOTIFY_TO = "amitjain@alsandouqalahmar.com";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("QUOTE_FORM_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse({ error: "Unauthorized" });
    }

    const name = clean(payload.name);
    const email = clean(payload.email);
    const phone = clean(payload.phone);
    const company = clean(payload.company);
    const message = clean(payload.message);
    const website = clean(payload.website);

    if (website || !name || !email || !phone || message.length < 20) {
      return jsonResponse({ ok: true });
    }

    if (name.length > 100 || email.length > 255 || phone.length > 40 || company.length > 150 || message.length > 2000) {
      return jsonResponse({ error: "Invalid request" });
    }

    // Use the spreadsheet ID explicitly. This remains reliable when the web app
    // is invoked without an active container UI context.
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ error: "Sheet tab not found" });
    }

    sheet.appendRow([new Date(), name, email, phone, company, message, "website quote form"]);

    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: "New website quote request",
      htmlBody: [
        "<h2>New quote request</h2>",
        "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
        "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>",
        "<p><strong>Phone:</strong> " + escapeHtml(phone) + "</p>",
        "<p><strong>Company:</strong> " + escapeHtml(company || "—") + "</p>",
        "<p><strong>Message:</strong><br>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>",
      ].join(""),
      body: "New quote request from " + name + " (" + email + ").\n\n" + message,
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ error: "Unexpected error" });
  }
}

// Run once from the Apps Script editor after adding the script, so Google can
// grant the spreadsheet and mail permissions before the web app is published.
function authorizeServices() {
  SpreadsheetApp.openById(SPREADSHEET_ID).getName();
  MailApp.getRemainingDailyQuota();
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
