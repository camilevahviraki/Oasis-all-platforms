import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import CustomButton from "../../../utils/components/Button";
import firebaseapp from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithCredential,
  FacebookAuthProvider,
  PhoneAuthProvider,
} from "firebase/auth";
import * as GoogleSignIn from "expo-google-sign-in";

const logo = require("../../../../assets/logos/simple-logo-blue.png");

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupWithPhone, setSignupWithPhone] = useState(false);

  const auth = getAuth(firebaseapp);

  const navigation = useNavigation();

  // ✅ Email Sign-Up
  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  // ✅ Google Sign-Up (Using Expo)
  const handleGoogleSignUp = async () => {
    try {
      await GoogleSignIn.initAsync();
      const user = await GoogleSignIn.signInAsync();
      if (user.type === "success") {
        console.log("Google User:", user);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  // ✅ Facebook Sign-Up
  const handleFacebookSignUp = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithCredential(auth, provider);
      console.log("Facebook User:", result.user);
    } catch (error) {
      console.error("Facebook Sign-In Error:", error.message);
    }
  };

  // ✅ Phone Number Sign-Up
  const handlePhoneSignUp = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(phoneNumber);
      const verificationCode = prompt("Enter the verification code sent to your phone:");
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      console.log("Phone User:", result.user);
    } catch (error) {
      console.error("Phone Sign-In Error:", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      {/* 🔹 Logo */}
      <Image source={logo} className="w-24 h-24 mb-4" resizeMode="contain" />

      <Text className="text-xl font-bold mb-4">Signup to Oasis</Text>

      {signupWithPhone ? (
        <>
          <TouchableOpacity onPress={() => setSignupWithPhone(false)} className="self-start mb-3">
            <Text className="text-blue-500">{"<"} Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="border border-gray-300 p-3 w-full rounded-md"
          />
          <CustomButton title="Signup with Phone" onPress={handlePhoneSignUp} type="primary" />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border border-gray-300 p-3 w-full rounded-md mb-2"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 p-3 w-full rounded-md mb-2"
          />
          <CustomButton title="Signup" onPress={handleEmailSignUp} type="primary" />

          {/* 🔹 Social Login Buttons */}
          <View className="flex-row mt-3">
            <CustomButton
              imageSource={require("../../../../assets/icons/google.png")}
              onPress={handleGoogleSignUp}
              type="secondary"
            />
            <CustomButton
              imageSource={require("../../../../assets/icons/facebook.png")}
              onPress={handleFacebookSignUp}
              type="secondary"
            />
          </View>

          {/* 🔹 Switch to Phone Signup */}
          <TouchableOpacity onPress={() => setSignupWithPhone(true)} className="mt-4">
            <Text className="text-blue-500">Or Sign Up with Phone</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 🔹 Already Have an Account? */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")} // Navigate to Login screen
        className="mt-6"
      >
        <Text className="text-gray-600">
          Already have an account?{" "}
          <Text className="text-blue-500 font-semibold">Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default styled(Signup);
