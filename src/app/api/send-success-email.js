// src/app/api/send-success-email/route.ts

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, name, plan } = await request.json();

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // Your email (use app password for Gmail)
        pass: process.env.SMTP_PASS, // Your app password
      },
    });

    const mailOptions = {
      from: `"NearExpiry" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Payment Was Successful 🎉',
      html: `
        <h2>Thank you for your purchase, ${name}!</h2>
        <p>We’ve successfully received your payment of <strong>${plan}</strong>.</p>
        <p>You will now have access to your selected assessment plan. We will process your request shortly!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
