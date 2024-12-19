import React, { useState } from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import firebaseapp from '../../../../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const auth = getAuth(firebaseapp);

  // Example function to sign up a user
  const handleEmailSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  //   const handleEmailSignUp = () => {
  //     firebaseapp.auth().createUserWithEmailAndPassword(email, password)
  //       .then(userCredential => {
  //         console.log('Email User:', userCredential.user);
  //       })
  //       .catch(error => console.error('Error creating user:', error));
  //   };

  const handleGoogleSignUp = async () => {
    const provider = new firebaseapp.auth.GoogleAuthProvider();
    try {
      const result = await firebaseapp.auth().signInWithPopup(provider);  // For web
      console.log('Google User:', result.user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new firebaseapp.auth.FacebookAuthProvider();
    try {
      const result = await firebaseapp.auth().signInWithPopup(provider);  // For web
      console.log('Facebook User:', result.user);
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
    }
  };

  // Sign up with Phone Number
  const handlePhoneSignUp = async () => {
    const recaptchaVerifier = new firebaseapp.auth.RecaptchaVerifier('recaptcha-container');
    try {
      const confirmationResult = await firebaseapp.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      const verificationCode = window.prompt('Enter the verification code sent to your phone:');
      const result = await confirmationResult.confirm(verificationCode);
      console.log('Phone User:', result.user);
    } catch (error) {
      console.error('Phone Sign-In Error:', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up with Email" onPress={handleEmailSignUp} />

      <Button title="Sign Up with Google" onPress={handleGoogleSignUp} />
      <Button title="Sign Up with Facebook" onPress={handleFacebookSignUp} />

      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
      <Button title="Sign Up with Phone" onPress={handlePhoneSignUp} />

      {/* Invisible ReCAPTCHA for Phone Number */}
      <View id="recaptcha-container"></View>
    </View>
  );
}
