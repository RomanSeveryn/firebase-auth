import {
  Alert,
  Dimensions,
  LogBox,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

export const Login = () => {
  const navigation = useNavigation();

  const initialValues = {
    email: '',
    password: '',
  };

  const auth = getAuth(app);

  LogBox.ignoreAllLogs(true);

  const handleCreateAccount = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((e) => {
        Alert.alert(e.message);
      });
  };

  const handleSignIn = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((e) => {
        console.log('handleSignIn.e', e);
        Alert.alert(e.message);
      });
  };

  const submit = (values, flag) => {
    if (flag === 'create') {
      handleCreateAccount(values);
    } else {
      handleSignIn(values);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, handleChange }) => {
          console.log('values', values);
          return (
            <View>
              <TextInput
                style={{
                  borderRadius: 2,
                  borderWidth: 2,

                  width: width * 0.8,
                  padding: 12,
                  borderColor: 'grey',
                  margin: 4,
                }}
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder={'email'}
              />
              <TextInput
                style={{
                  borderRadius: 2,
                  borderWidth: 2,
                  width: width * 0.8,
                  padding: 12,
                  borderColor: 'grey',
                  margin: 4,
                }}
                value={values.password}
                placeholder={'password'}
                onChangeText={handleChange('password')}
              />

              <TouchableOpacity
                onPress={() => submit(values, 'sign in')}
                style={{
                  width: width * 0.8,
                  padding: 12,
                  backgroundColor: 'grey',
                  margin: 4,
                  alignItems: 'center',
                }}
              >
                <Text>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => submit(values, 'create')}
                style={{
                  width: width * 0.8,
                  padding: 12,
                  backgroundColor: 'grey',
                  margin: 4,
                  alignItems: 'center',
                }}
              >
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
