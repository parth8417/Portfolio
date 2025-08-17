import { Request, Response } from 'express';
import { saveContactMessage } from '../src/lib/mongodb';
import { sendEmailViaAPI } from '../src/lib/emailService';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: Request, res: Response) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to MongoDB
    const savedMessage = await saveContactMessage(formData);
    
    // Send email notification (optional, based on your preference)
    try {
      await sendEmailViaAPI(formData);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - the message is still saved
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact message saved successfully',
      id: savedMessage.id 
    });
    
  } catch (error: any) {
    console.error('Error in contact API:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
