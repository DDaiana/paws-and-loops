import nodemailer from "nodemailer";

const RECIPIENT = "hello.pawsandloops@gmail.com";

function requireEmailConfig() {
  const user = process.env.PAWS_EMAIL_USER;
  const pass = process.env.PAWS_EMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) throw new Error("Email transport is not configured.");
  return { user, pass };
}

export async function sendWebsiteEmail({ subject, text, replyTo }) {
  const { user, pass } = requireEmailConfig();
  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transport.sendMail({
    from: `Paws & Loops Website <${user}>`,
    to: RECIPIENT,
    replyTo: replyTo || undefined,
    subject,
    text,
  });
}
