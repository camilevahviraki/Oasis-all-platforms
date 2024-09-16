import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './app/redux/reduxStore';
import SignIn from './app/components/auth/sign-in';
import UpdatePassword from './app/components/auth/change-password';
import SignUp from './app/components/auth/sign-up';
import Update from './app/components/auth/update';
import axios from 'axios';
import { name as appName } from './app.json';

axios.defaults.adapter = require('axios/lib/adapters/xhr');
AppRegistry.registerComponent(appName, () => App);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="/" component={SignUp} />
        <Stack.Screen name="auth/update" component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
