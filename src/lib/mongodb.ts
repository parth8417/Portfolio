import { MongoClient, Db, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.VITE_MONGODB_DB || 'portfolio';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(MONGODB_DB);
    
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// Contact form data interface
export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

// Function to save contact message to MongoDB
export async function saveContactMessage(data: Omit<ContactMessage, '_id' | 'createdAt' | 'status'>) {
  try {
    const { db } = await connectToDatabase();
    
    const contactMessage: Omit<ContactMessage, '_id'> = {
      ...data,
      createdAt: new Date(),
      status: 'new'
    };
    
    const result = await db.collection('contact_messages').insertOne(contactMessage);
    
    return {
      success: true,
      id: result.insertedId.toString()
    };
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
}

// Function to get all contact messages
export async function getContactMessages() {
  try {
    const { db } = await connectToDatabase();
    
    const messages = await db.collection('contact_messages')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return messages;
  } catch (error) {
    console.error('Error getting contact messages:', error);
    throw error;
  }
}

// Function to update message status
export async function updateMessageStatus(id: string, status: ContactMessage['status']) {
  try {
    const { db } = await connectToDatabase();
    
    const result = await db.collection('contact_messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
}
