import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQi0RjR2ujs6gSCOG0eu3MH8e0abdpfa0",
  authDomain: "oasis-app-fdc4b.firebaseapp.com",
  projectId: "oasis-app-fdc4b",
  storageBucket: "oasis-app-fdc4b.appspot.com",
  messagingSenderId: "396073108706",
  appId: "1:396073108706:web:0338f4ab5102bf4e0f4abb"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);


export const auth = initializeAuth(firebaseapp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
