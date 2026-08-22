import { sendWebsiteEmail } from "../lib/email.js";
import { applyCors, isRateLimited, parseJsonRequest } from "../lib/http.js";
import { isHoneypotFilled, validateConsultation } from "../lib/validation.js";

export default async function handler(req, res) {
  applyCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });
  if (isRateLimited(req)) return res.status(429).json({ error: "Too many requests." });
  const body = parseJsonRequest(req);
  if (!body) return res.status(400).json({ error: "Malformed request." });
  if (isHoneypotFilled(body)) return res.status(200).json({ ok: true });
  const data = validateConsultation(body);
  if (!data) return res.status(400).json({ error: "Invalid submission." });
  const submitted = new Date().toISOString();
  const text = `Name:\n${data.name}\n\nPreferred Date & Time:\n${data.datetime}\n\nPlace of Consultation:\n${data.place}\n\nPhone:\n${data.phone}\n\nEmail:\n${data.email}\n\nSubmitted:\n${submitted}\n\nSource:\nPaws & Loops Custom Order Form`;
  try {
    await sendWebsiteEmail({ subject: "Paws & Loops — New Custom Order Consultation", text, replyTo: data.email });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(`Consultation email delivery failed: ${error?.code || "UNKNOWN"} ${error?.responseCode || ""} ${error?.command || ""}`);
    return res.status(500).json({ error: "Email delivery failed." });
  }
}
