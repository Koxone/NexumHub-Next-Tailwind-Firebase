import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const testigoMxConfig = {
  apiKey: process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_TESTIGOMX_FIREBASE_APP_ID,
};

const testigoMxApp =
  getApps().find((app) => app.name === 'TestigoMX') ||
  initializeApp(testigoMxConfig, 'TestigoMX');

export const dbTestigoMX = getFirestore(testigoMxApp);
