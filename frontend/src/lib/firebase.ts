import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let auth: Auth | null = null;

try {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (apiKey) {
    const app = initializeApp({
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    auth = getAuth(app);
  }
} catch {
  // Firebase not configured
}

export { auth };
