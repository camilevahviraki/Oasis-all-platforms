import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import FormR from '../../utils/lib/form/FormR'; // Assuming you converted FormR for React Native
import { signUpUser } from '../../redux/reducers/user/authentication';
// import userIcon from '../../assets/user-show-icon.png';
const userIcon = require('../../assets/user-show-icon.png');



const SignUp = (props) => {
  const navigation = useNavigation();
  const { reusable } = props;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authenticationReducer);
  const [useImage, setUserImage] = useState(userIcon);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const [userAvatarFile, setUserAvatarFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputErrorArr, setInputErrorArr] = useState([0, 0, 0, 0, 0, 0]);
  const [loader, setLoader] = useState(false);

  const inputsArray = [
    {
      type: 'text',
      name: 'first_name',
      classInput: 'user-authentication-form-input',
      placeholder: 'First name',
    },
    {
      type: 'text',
      name: 'last_name',
      classInput: 'user-authentication-form-input',
      placeholder: 'Last name',
    },
    {
      type: 'mail',
      name: 'email',
      classInput: 'user-authentication-form-input',
      placeholder: 'Email',
    },
    {
      type: 'password',
      name: 'password',
      classInput: 'user-authentication-form-input',
      placeholder: 'Password',
    },
    {
      type: 'password',
      name: 'confirm_password',
      classInput: 'user-authentication-form-input',
      placeholder: 'Confirm Password',
    },
    {
      type: 'text',
      name: 'admin',
      classInput: 'user-authentication-form-input',
      placeholder: 'no',
    },
  ];

  const onSignup = (e) => {
    const firstName = e.first_name;
    const lastName = e.last_name;
    const email = e.email;
    const password = e.password;
    const confirmPassword = e.confirm_password;

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {
      setMessage('Please! These marked fields are required');
      setInputErrorArr([1, 1, 1, 1, 1]);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please! Enter a valid email');
      setInputErrorArr([0, 0, 1, 0, 0]);
    } else if (password !== confirmPassword) {
      setMessage('Password confirmation do not Match');
      setInputErrorArr([0, 0, 0, 1, 1]);
    } else {
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
    }
  };

  useEffect(() => {
    if (userData.token) {
      setLoader(false);
      navigation.navigate('Home'); // Navigate to home screen
    }
  }, [userData]);

  const pickImage = async () => {
    // Request camera roll permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
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
      setUserAvatarFile(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>

      <TouchableOpacity style={styles.userImageWrap} onPress={() => pickImage()}>
        <Image source={useImage} style={styles.userImage} />
        {/* <Text> Select picture</Text> */}
      </TouchableOpacity>

      <FormR
        classForm={reusable ? 'authentication-pop-up-form' : 'user-authentication-form'}
        inputsArray={inputsArray}
        submitFunction={onSignup}
        submitButton={!loader ? 'Signup' : <ActivityIndicator size="small" color="#fff" />}
        submitClass="user-authentication-form-button"
        errorMessage={message}
        inputErrorArr={inputErrorArr}
      />

      {!reusable ? (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an Account? Login</Text>
        </TouchableOpacity>
      ) : null}

      {profilePopUp ? (
        <View style={styles.imagePopupContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setProfilePopUp(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Image source={useImage} style={styles.popupImage} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userImageWrap: {
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
  imagePopupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  popupImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default SignUp;
