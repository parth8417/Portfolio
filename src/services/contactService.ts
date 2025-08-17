interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// MongoDB connection for browser environment using fetch to your backend
export class ContactService {
  private apiBase: string;

  constructor() {
    // This will be your backend API URL
    this.apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  async submitContact(formData: ContactFormData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.apiBase}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }
  }

  // Alternative: Direct MongoDB integration (for development/testing)
  async submitContactDirect(formData: ContactFormData): Promise<ApiResponse> {
    try {
      // For now, we'll simulate the API call
      // In production, you'll need a proper backend server
      
      // Save to localStorage for demonstration
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const newContact = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'new'
      };
      
      contacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      
      // Simulate email sending
      console.log('Contact form submitted:', newContact);
      
      return {
        success: true,
        message: 'Contact form submitted successfully'
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        error: 'Failed to submit contact form'
      };
    }
  }

  // Get all contacts (admin function)
  async getContacts() {
    try {
      const response = await fetch(`${this.apiBase}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
