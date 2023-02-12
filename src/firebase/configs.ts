import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
if (!process.env.NEXT_PUBLIC_API_KEY)
  throw new Error("NEXT_PUBLIC_API_KEY is not defined");
if (!process.env.NEXT_PUBLIC_AUTH_DOMAIN)
  throw new Error("NEXT_PUBLIC_AUTH_DOMAIN is not defined");
if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
if (!process.env.NEXT_PUBLIC_STORAGE_BUCKET)
  throw new Error("NEXT_PUBLIC_STORAGE_BUCKET is not defined");
if (!process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID)
  throw new Error("NEXT_PUBLIC_MESSENGING_SENDER_ID is not defined");
if (!process.env.NEXT_PUBLIC_APP_ID)
  throw new Error("NEXT_PUBLIC_APP_ID is not defined");
if (!process.env.NEXT_PUBLIC_MEASUREMENT_ID)
  throw new Error("NEXT_PUBLIC_MEASUREMENT_ID is not defined");
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
