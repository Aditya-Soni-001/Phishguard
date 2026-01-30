import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, trapUrl } = await req.json();

    // Extracting name from email (e.g., john.doe@gmail.com -> John Doe)
    const namePart = email.split('@')[0].split(/[._]/).map(
      (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    ).join(' ');

    const { data, error } = await resend.emails.send({
      from: 'HR Department <onboarding@resend.dev>', // Resend free tier uses this domain
      to: [email],
      subject: 'Action Required: Mandatory e-KYC Employee Verification',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1e40af;">Internal Employee Portal</h2>
          <p>Dear <strong>${namePart}</strong>,</p>
          <p>Our records indicate that your annual <strong>e-KYC verification</strong> is pending. To ensure uninterrupted payroll processing for the upcoming cycle, please complete the verification process via our secure portal.</p>
          
          <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #1e3a8a;"><strong>Reference ID:</strong> HR-KYC-2026-9921</p>
            <p style="margin: 0; font-size: 14px; color: #1e3a8a;"><strong>Deadline:</strong> Within 24 hours</p>
          </div>

          <a href="${trapUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Identity Now</a>
          
          <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
            This is an automated message from the Corporate HR Department. Please do not reply to this email. 
            All data is handled according to Enterprise Privacy Policy (AES-256).
          </p>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}