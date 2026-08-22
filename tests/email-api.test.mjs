import assert from "node:assert/strict";
import nodemailer from "nodemailer";

const deliveries = [];
nodemailer.createTransport = () => ({ sendMail: async mail => deliveries.push(mail) });
process.env.PAWS_EMAIL_USER = "hello.pawsandloops@gmail.com";
process.env.PAWS_EMAIL_APP_PASSWORD = "test-only-placeholder";

const { default: contact } = await import("../api/contact.js");
const { default: consultation } = await import("../api/consultation.js");

function response() {
  return {
    statusCode: 200,
    body: null,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
    end() { return this; },
  };
}

async function submit(handler, body, headers = { "content-type": "application/json", origin: "http://localhost:8080" }) {
  const res = response();
  await handler({ method: "POST", body, headers, socket: { remoteAddress: String(Math.random()) } }, res);
  return res;
}

let res = await submit(contact, { name: "Ada", subject: "Custom order", message: "Hello", website: "" });
assert.equal(res.statusCode, 200);
assert.equal(deliveries[0].to, "hello.pawsandloops@gmail.com");
assert.match(deliveries[0].text, /Paws & Loops Contact Form/);

res = await submit(consultation, { name: "Ada", datetime: "2026-09-01T10:00", place: "London", phone: "07123456789", email: "ada@example.com", website: "" });
assert.equal(res.statusCode, 200);
assert.equal(deliveries[1].replyTo, "ada@example.com");
assert.match(deliveries[1].text, /Paws & Loops Custom Order Form/);

res = await submit(consultation, { name: "Ada", datetime: "x", place: "London", phone: "1", email: "invalid", website: "" });
assert.equal(res.statusCode, 400);

const beforeSpam = deliveries.length;
res = await submit(contact, { name: "Bot", subject: "Spam", message: "Spam", website: "filled" });
assert.equal(res.statusCode, 200);
assert.equal(deliveries.length, beforeSpam);

res = await submit(contact, { name: "Ada", subject: "Hi", message: "Hello" }, { "content-type": "text/plain" });
assert.equal(res.statusCode, 400);

console.log("Email API tests: PASS");
