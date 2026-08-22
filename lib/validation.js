const limits = { name: 100, subject: 120, message: 3000, datetime: 80, place: 250, phone: 50, email: 254 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanString(value, field) {
  if (typeof value !== "string") return null;
  const clean = value.trim();
  if (!clean || clean.length > limits[field]) return null;
  return clean;
}

export function validateContact(body) {
  const name = cleanString(body.name, "name");
  const subject = cleanString(body.subject, "subject");
  const message = cleanString(body.message, "message");
  return name && subject && message ? { name, subject, message } : null;
}

export function validateConsultation(body) {
  const name = cleanString(body.name, "name");
  const datetime = cleanString(body.datetime, "datetime");
  const place = cleanString(body.place, "place");
  const phone = cleanString(body.phone, "phone");
  const email = cleanString(body.email, "email");
  return name && datetime && place && phone && email && emailPattern.test(email)
    ? { name, datetime, place, phone, email }
    : null;
}

export function isHoneypotFilled(body) {
  return typeof body.website === "string" && body.website.trim().length > 0;
}
