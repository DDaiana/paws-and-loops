const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

export function applyCors(req, res) {
  const allowed = process.env.PAWS_ALLOWED_ORIGIN || "https://ddaiana.github.io";
  const origin = req.headers.origin;
  if (origin === allowed || /^http:\/\/localhost(?::\d+)?$/.test(origin || "")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export function isRateLimited(req) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter(time => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export function parseJsonRequest(req) {
  const contentType = String(req.headers["content-type"] || "").split(";")[0].trim();
  if (contentType !== "application/json" || !req.body || typeof req.body !== "object" || Array.isArray(req.body)) return null;
  return req.body;
}
