
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

// Utility to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace 'serviceAccountKey.json' with the actual path to your downloaded key file
const serviceAccount = path.join(__dirname, 'serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;