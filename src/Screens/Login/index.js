import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserIcon, LockIcon, FacebookIcon, GoogleIcon} from '../../SVG';
import {AuthContext} from '../../Context/auth';
import Label from '../../components/Label';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginAttempt = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User logged in!', user);
      })
      .catch(err => {
        console.log('ERROR', err);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            We're happy to see. You can Login and continue consulting your
            problem or read some tips.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Label label="email" required />
          <View style={styles.username}>
            <UserIcon />
            <TextInput
              placeholderTextColor="#BEBEBE"
              style={styles.inputField}
              placeholder="@gmail.com"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <Label label="Password" required />
          <View style={[styles.username]}>
            <LockIcon />
            <TextInput
              placeholderTextColor="#BEBEBE"
              style={styles.inputField}
              placeholder="password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.btn} onPress={onLoginAttempt}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line}></View>
          <Text style={styles.text}>or Sign in with</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <FacebookIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <GoogleIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextContainer}>
          <Text style={styles.text}>I don't have an account</Text>
          <Text
            onPress={() => navigation.navigate('Sign Up')}
            style={styles.signupText}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#181920',
    justifyContent: 'space-between',
  },
  headingContainer: {},
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#BEBEBE',
    marginTop: 15,
  },
  inputContainer: {
    marginTop: 25,
  },
  inputField: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: '#252A34',
    borderRadius: 8,
    color: '#fff',
    padding: 10,
    backgroundColor: '#252A34',
  },
  username: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#252A34',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#0b59a2',
    textAlign: 'right',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn: {
    backgroundColor: '#0b59a2',
    padding: 15,
    borderRadius: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    marginVertical: 25,
    width: '30%',
    height: 1,
    backgroundColor: '#BEBEBE',
    marginHorizontal: 10,
  },
  text: {
    color: '#BEBEBE',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  socialBtn: {
    backgroundColor: '#252A34',
    padding: 13,
    borderRadius: 50,
  },
  signupTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  signupText: {
    color: '#0b59a2',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
