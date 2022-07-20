import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';

import auth from '@react-native-firebase/auth';

import StyledError from '../../components/Error';
import Label from '../../components/Label';
import StyledTextInput from '../../components/TextInput';
import {COLORS} from '../../constants';
import {FIREBASE_ERRORS} from '../../firebase/errors';
import {checkIsEmailValid} from '../../utils';
import {Button} from 'native-base';
import AuthFooter from '../../components/AuthFooter';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLoginAttempt = () => {
    setLoading(true);
    setError('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('User logged in!', user);
      })
      .catch(err => {
        setLoading(false);
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

  const invalidEmailError = email.length > 0 && invalidEmail;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.container}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              We're happy to see. Login now and connect with your friends.
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
              showErrorIcon={invalidEmailError || Boolean(error)}
              message={
                (invalidEmailError && 'Invalid Email') || FIREBASE_ERRORS[error]
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
            height="12"
            backgroundColor={isDisabled ? 'primary.900' : 'primary.500'}
            borderRadius="full"
            _text={{
              color: '#1F2937',
              fontFamily: 'Lato-Heavy',
            }}
            disabled={isDisabled}
            isLoading={loading}
            onPress={onLoginAttempt}
            isLoadingText="Logging In">
            Sign In
          </Button>
          <AuthFooter
            navigation={navigation}
            navigateTo="Sign Up"
            navigationText="Sign Up"
            description="I don't have an account"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    color: '#fff',
    fontFamily: 'Lato-Heavy',
  },
  subtitle: {
    color: '#BEBEBE',
    marginTop: 15,
    fontFamily: 'Lato-Medium',
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
    fontFamily: 'Lato-Regular',
    paddingBottom: 12,
  },
});
