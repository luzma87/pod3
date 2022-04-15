import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword, getAuth,
  onAuthStateChanged, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  addDoc, collection, doc, getDoc, getFirestore, onSnapshot, query, setDoc, where,
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBwfwjks5vgkpfRQBRnjTC4V5A9WT0dFps',
  authDomain: 'pod3-dev.firebaseapp.com',
  projectId: 'pod3-dev',
  storageBucket: 'pod3-dev.appspot.com',
  messagingSenderId: '875718789391',
  appId: '1:875718789391:web:ca3d64dee05f6df0afd67a',
  measurementId: 'G-DG4CZT1NKK',
};

const COLLECTIONS = {

};

const Firebase = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth();
};
