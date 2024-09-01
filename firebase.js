import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(process.env); // Firebase config is automatically loaded

export const db = firebase.firestore();
export const auth = firebase.auth();
