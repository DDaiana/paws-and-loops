import { sendWebsiteEmail } from "../lib/email.js";
import { applyCors, isRateLimited, parseJsonRequest } from "../lib/http.js";
import { isHoneypotFilled, validateContact } from "../lib/validation.js";

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (isRateLimited(req)) return res.status(429).json({ error: "Too many requests." });
  const body = parseJsonRequest(req);
  if (!body) return res.status(400).json({ error: "Malformed request." });
  if (isHoneypotFilled(body)) return res.status(200).json({ ok: true });
  const data = validateContact(body);
  if (!data) return res.status(400).json({ error: "Invalid submission." });
  const submitted = new Date().toISOString();
  const text = `Name:\n${data.name}\n\nSubject:\n${data.subject}\n\nMessage:\n${data.message}\n\nSubmitted:\n${submitted}\n\nSource:\nPaws & Loops Contact Form`;
  try {
    await sendWebsiteEmail({ subject: "Paws & Loops — New Contact Message", text });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(`Contact email delivery failed: ${error?.code || "UNKNOWN"} ${error?.responseCode || ""} ${error?.command || ""}`);
    return res.status(500).json({ error: "Email delivery failed." });
  }
}
