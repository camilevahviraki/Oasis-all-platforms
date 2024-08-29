import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
//   return <Text> Oasis App</Text>
return  <View>
     <Text>Oasis</Text>
     <Link href="/auth/sign-in">Sign In</Link>
     <Link href="/auth/sign-up">Sign Up</Link>
  </View> 
 
}