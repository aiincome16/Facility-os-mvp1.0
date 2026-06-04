export function createEmailDraft({
  to,
  subject,
  body
}) {
  if (!to || !subject) {
    return {
      success: false,
      message: "Empfänger oder Betreff fehlt"
    };
  }

  return {
    success: true,
    draft: {
      To: to,
      Subject: subject,
      Body: body || "",
      Created_at: new Date().toISOString()
    }
  };
}

export function createCustomerNotificationEmail({
  customerEmail,
  objectName,
  title,
  message
}) {
  return createEmailDraft({
    to: customerEmail,
    subject: `Facility-OS: ${title}`,
    body: `
Objekt:
${objectName}

Nachricht:
${message}

Diese Nachricht wurde automatisch durch Facility-OS erstellt.
`
  });
}

export function createReplacementEmail({
  employeeEmail,
  objectName,
  date,
  time
}) {
  return createEmailDraft({
    to: employeeEmail,
    subject: "Facility-OS: Vertretungsanfrage",
    body: `
Du wurdest als Vertretung angefragt.

Objekt:
${objectName}

Datum:
${date}

Zeit:
${time}

Bitte bestätige oder lehne die Anfrage in Facility-OS ab.
`
  });
}

export function createMaterialOrderEmail({
  supplierEmail,
  objectName,
  material,
  quantity,
  unit
}) {
  return createEmailDraft({
    to: supplierEmail,
    subject: "Facility-OS: Materialbestellung",
    body: `
Materialbestellung:

Objekt:
${objectName}

Material:
${material}

Menge:
${quantity} ${unit}
`
  });
}