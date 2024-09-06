import { Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from '../redux/store';

const Page = () => {

  return (
    <Provider store={store}>
     
        <Link href="/auth/sign-in">Sign In</Link>
        <Link href="/auth/sign-up">Sign Up</Link>

    </Provider>
  )


}

export default Page;