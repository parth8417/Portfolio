import nodemailer from 'nodemailer';

interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create transporter - you'll need to configure this with your email service
function createTransporter(): nodemailer.Transporter {
  const config: EmailConfig = {
    service: process.env.VITE_EMAIL_SERVICE || 'gmail', // gmail, outlook, etc.
    auth: {
      user: process.env.VITE_EMAIL_USER || '',
      pass: process.env.VITE_EMAIL_PASSWORD || '', // Use app password for Gmail
    },
  };

  return nodemailer.createTransport(config);
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const transporter = createTransporter();
    
    const { name, email, subject, message } = formData;
    
    // Email to site owner
    const ownerEmailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: process.env.VITE_OWNER_EMAIL || 'ParthPanchal5447@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New message from your portfolio website</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Confirmation email to sender
    const senderEmailOptions = {
      from: process.env.VITE_EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${name},</p>
        <p>I appreciate you taking the time to contact me. I've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>Best regards,<br>Parth Panchal</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerEmailOptions),
      transporter.sendMail(senderEmailOptions)
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Alternative API-based email service (for production)
export async function sendEmailViaAPI(formData: ContactFormData) {
  try {
    // Using a service like EmailJS, Resend, or SendGrid
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email via API:', error);
    throw error;
  }
}
