import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { saveContactMessage, getContactMessages } from './mongodb.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All fields are required' 
      });
    }

    // Save to MongoDB
    const result = await saveContactMessage({ name, email, subject, message });

    // TODO: Send email notification here
    // You can integrate with SendGrid, Resend, or other email services

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.id
    });

  } catch (error: any) {
    console.error('Error handling contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Get all contact messages (admin endpoint)
app.get('/api/contacts', async (req, res) => {
  try {
    const messages = await getContactMessages();
    res.json({
      success: true,
      data: messages
    });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
      details: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

export default app;
