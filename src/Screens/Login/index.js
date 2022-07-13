import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FacebookIcon, GoogleIcon} from '../../SVG';
import Label from '../../components/Label';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import StyledTextInput from '../../components/TextInput';
import {COLORS} from '../../constants';
import StyledError from '../../components/Error';
import {FIREBASE_ERRORS} from '../../firebase/errors';
import {useDebounce} from 'use-debounce';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkIsEmailValid = string => {
    const isEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !string.toString().toLowerCase().match(isEmail);
  };

  const onLoginAttempt = () => {
    setError('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User logged in!', user);
      })
      .catch(err => {
        console.log('ERROR', err.message);
        setError(err.message);
      });
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  const invalidEmail = checkIsEmailValid(email);

  const isDisabled =
    email.length === 0 || password.length === 0 || invalidEmail;

  return (
    <View style={styles.container}>
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
            <Label label="Email" required />
            <StyledTextInput
              placeholder="@gmail.com"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <StyledError
              showErrorIcon={
                (email.length > 0 && invalidEmail) || Boolean(error)
              }
              message={
                (email.length > 0 && invalidEmail && 'Invalid Email') ||
                FIREBASE_ERRORS[error]
              }
            />

            <Label label="Password" required />
            <StyledTextInput
              placeholder="Your Password"
              value={password}
              secure={true}
              onChangeText={text => setPassword(text)}
            />
            <StyledError
              showErrorIcon={Boolean(error)}
              message={FIREBASE_ERRORS[error]}
            />

            <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Button
            color={COLORS.neon}
            disabled={isDisabled}
            text="Sign In"
            onPress={onLoginAttempt}
          />
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
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.background,
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
    color: COLORS.neon,
    textAlign: 'right',
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
    color: COLORS.neon,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
