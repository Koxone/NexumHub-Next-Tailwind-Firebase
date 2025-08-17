import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const externalFirebaseConfig = {
  apiKey: 'AIzaSyCynmiUsJy6Ss5vpcIlgDXaoR1XwxfBG9o',
  authDomain: 'testigomx-b0053.firebaseapp.com',
  projectId: 'testigomx-b0053',
  storageBucket: 'testigomx-b0053.firebasestorage.app', 
  messagingSenderId: '761062163755',
  appId: '1:761062163755:web:b5b91602e6c38f5ea3f16e',
};

const testigoMxApp =
  getApps().find((app) => app.name === 'TestigoMX') ||
  initializeApp(externalFirebaseConfig, 'TestigoMX');

export const dbTestigoMX = getFirestore(testigoMxApp);
