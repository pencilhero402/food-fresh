import { initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_FIREBASE_ID!,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signOut = () => firebaseSignOut(auth);