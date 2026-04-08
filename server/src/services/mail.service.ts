import nodemailer from 'nodemailer';

import { env } from '../config/env.js';
import { CreateContactMessageInput } from '../validators/contact.validator.js';

type MailNotificationResult = {
  delivered: boolean;
  reason: string;
};

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getMailFromAddress(): string | undefined {
  return env.MAIL_FROM ?? env.SMTP_USER;
}

function getSmtpHost(): string | undefined {
  if (!env.SMTP_HOST) {
    return undefined;
  }

  return env.SMTP_HOST.trim().toLowerCase() === 'localhost' ? '127.0.0.1' : env.SMTP_HOST;
}

function formatMailErrorReason(error: Error): string {
  if (error.message.includes('ECONNREFUSED ::1:')) {
    return `${error.message}. If your SMTP server is running on this machine, use SMTP_HOST=127.0.0.1 or enable IPv6 listening.`;
  }

  return error.message;
}

function getTransporter(): nodemailer.Transporter | null {
  const mailFrom = getMailFromAddress();
  const smtpHost = getSmtpHost();

  if (!env.ADMIN_EMAIL || !mailFrom || !smtpHost || !env.SMTP_PORT) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE === 'true',
      auth: env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
          }
        : undefined,
    });
  }

  return transporter;
}

export async function sendAdminContactNotification(input: CreateContactMessageInput): Promise<MailNotificationResult> {
  const mailFrom = getMailFromAddress();
  const mailTransporter = getTransporter();

  if (!mailTransporter || !env.ADMIN_EMAIL || !mailFrom) {
    return {
      delivered: false,
      reason: 'Set ADMIN_EMAIL, MAIL_FROM or SMTP_USER, SMTP_HOST, and SMTP_PORT in the active server env file.',
    };
  }

  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeDetails = escapeHtml(input.details).replace(/\r?\n/g, '<br />');

  try {
    await mailTransporter.sendMail({
      from: mailFrom,
      to: env.ADMIN_EMAIL,
      replyTo: input.email,
      subject: `New project brief from ${input.name}`,
      text: [
        'A new project brief was submitted from the portfolio website.',
        '',
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        '',
        'Project details:',
        input.details,
      ].join('\n'),
      html: `
        <h2>New project brief</h2>
        <p>A new project brief was submitted from the portfolio website.</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Project details:</strong><br />${safeDetails}</p>
      `,
    });
  } catch (error) {
    return {
      delivered: false,
      reason: error instanceof Error ? formatMailErrorReason(error) : 'Unknown SMTP delivery error.',
    };
  }

  return {
    delivered: true,
    reason: 'Email sent.',
  };
}
