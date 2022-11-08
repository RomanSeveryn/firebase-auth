import { Button, Text, View } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../firebase-config';

export const Home = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 14 }}>Home</Text>
      <Button
        title={'Logout'}
        onPress={() => {
          signOut(auth);
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};
