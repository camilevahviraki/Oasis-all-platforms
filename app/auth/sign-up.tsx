import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { signUpUser } from '../../redux/authentication/signUpReducer';
import tw from 'tailwind-react-native-classnames';

const SignUp = (props) => {
  const navigation = useNavigation();
  const { reusable } = props;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const [useImage, setUserImage] = useState(null); // No default image
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [userAvatarFile, setUserAvatarFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0, 0]);
  const [loader, setLoader] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the gallery is required!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.uri);
      setUserAvatarFile(result.uri);
    }
  };

  const onSignup = () => {
    const formData = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        avatar: userAvatarFile,
        admin: 'yes',
      },
    };
    dispatch(signUpUser(formData));
    setMessage(null);
    setLoader(true);
    setInputErrorArr([0, 0, 0, 0, 0]);
  };

  useEffect(() => {
    if (userData.token) {
      setLoader(false);
      navigation.navigate('Home');
    }
  }, [userData]);

  return (
    <View style={tw`flex-1 items-center justify-center bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-6`}>Sign Up</Text>
      
      <TouchableOpacity style={tw`mb-6`} onPress={pickImage}>
        {useImage ? (
          <Image source={{ uri: useImage }} style={tw`w-32 h-32 rounded-full`} />
        ) : (
          <View style={tw`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center`}>
            <Text style={tw`text-gray-500`}>Pick an Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 w-full mb-4`}
        placeholder="First name"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 w-full mb-4`}
        placeholder="Last name"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 w-full mb-4`}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 w-full mb-4`}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={tw`border border-gray-300 rounded-md p-2 w-full mb-4`}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {message && <Text style={tw`text-red-500 mb-4`}>{message}</Text>}
      
      {loader ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Signup" onPress={onSignup} />
      )}

      {!reusable && (
        <Text style={tw`mt-4`}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-blue-500`}>Login</Text>
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
};

export default SignUp;
