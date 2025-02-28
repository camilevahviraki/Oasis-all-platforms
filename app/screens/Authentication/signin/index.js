import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import CustomButton from "../../../utils/components/Button";
import firebaseapp from "../../../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  FacebookAuthProvider,
  PhoneAuthProvider,
} from "firebase/auth";
import * as GoogleSignIn from "expo-google-sign-in";

const logo = require("../../../../assets/logos/simple-logo-blue.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginWithPhone, setLoginWithPhone] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth(firebaseapp);

  // ✅ Email Login
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignIn.initAsync();
      const user = await GoogleSignIn.signInAsync();
      if (user.type === "success") {
        console.log("Google User:", user);
      }
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  // ✅ Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithCredential(auth, provider);
      console.log("Facebook User:", result.user);
    } catch (error) {
      console.error("Facebook Login Error:", error.message);
    }
  };

  // ✅ Phone Login
  const handlePhoneLogin = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(phoneNumber);
      const verificationCode = prompt("Enter the verification code sent to your phone:");
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      console.log("Phone User:", result.user);
    } catch (error) {
      console.error("Phone Login Error:", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-6">
      {/* 🔹 Logo */}
      <Image source={logo} className="w-24 h-24 mb-4" resizeMode="contain" />

      <Text className="text-xl font-bold mb-4">Login to Oasis</Text>

      {loginWithPhone ? (
        <>
          <TouchableOpacity onPress={() => setLoginWithPhone(false)} className="self-start mb-3">
            <Text className="text-blue-500">{"<"} Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="border border-gray-300 p-3 w-full rounded-md"
          />
          <CustomButton title="Login with Phone" onPress={handlePhoneLogin} type="primary" />
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
          <CustomButton title="Login" onPress={handleEmailLogin} type="primary" />

          {/* 🔹 Social Login Buttons */}
          <View className="flex-row mt-3">
            <CustomButton
              imageSource={require("../../../../assets/icons/google.png")}
              onPress={handleGoogleLogin}
              type="secondary"
            />
            <CustomButton
              imageSource={require("../../../../assets/icons/facebook.png")}
              onPress={handleFacebookLogin}
              type="secondary"
            />
          </View>

          {/* 🔹 Switch to Phone Login */}
          <TouchableOpacity onPress={() => setLoginWithPhone(true)} className="mt-4">
            <Text className="text-blue-500">Or Login with Phone</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 🔹 Don't Have an Account? */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")} // Navigate to Signup screen
        className="mt-6"
      >
        <Text className="text-gray-600">
          Don't have an account?{" "}
          <Text className="text-blue-500 font-semibold">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default styled(Login);
