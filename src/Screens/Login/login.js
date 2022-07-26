import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {View, Text, HStack, VStack, Button, Divider, Image} from 'native-base';
import auth from '@react-native-firebase/auth';

import {COLORS} from '../../constants';
import {FacebookIcon, GoogleIcon} from '../../SVG';
import {checkIsEmailValid} from '../../utils';
import StyledError from '../../components/Error';
import {FIREBASE_ERRORS} from '../../firebase/errors';
import StyledButton from '../../components/Button';

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
    email.length === 0 || password.length === 0 || invalidEmail || loading;

  const invalidEmailError = email.length > 0 && invalidEmail;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View
        // backgroundColor="amber.100"
        alignItems="center"
        justifyContent="center">
        <Image
          style={{
            height: 200,
            width: 200,
          }}
          source={require('../../../assets/login.png')}
          alt="Illustration"
        />
      </View>
      <Text fontSize="4xl" fontFamily="Lato-Medium">
        Login
      </Text>

      <VStack space="5" mt="6">
        <View>
          <TextInput
            placeholder="Email ID"
            placeholderTextColor={COLORS.white2}
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.textInput, error && styles.textInputError]}
            maxLength={30}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <StyledError
            // showErrorIcon={invalidEmailError || Boolean(error)}
            message={
              (invalidEmailError && 'Invalid Email') || FIREBASE_ERRORS[error]
            }
          />
        </View>
        <View>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={COLORS.white2}
            style={[styles.textInput, error && styles.textInputError]}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <StyledError
            // showErrorIcon={Boolean(error)}
            message={FIREBASE_ERRORS[error]}
          />
        </View>
      </VStack>
      <Text
        fontFamily="Lato-Regular"
        textAlign="right"
        my="5"
        color="primary.400">
        Forgot Password ?
      </Text>

      {/* <TouchableOpacity
        style={[
          styles.btnDefault,
          isDisabled && {borderColor: COLORS.transparent},
        ]}>
        <Button
          onPress={onLoginAttempt}
          height="12"
          borderRadius="full"
          backgroundColor={isDisabled ? COLORS.gray : COLORS.white2}
          borderColor={COLORS.white2}
          disabled={isDisabled}
          isLoading={loading}
          _text={{
            color: COLORS.background,
            fontFamily: 'Lato-Regular',
          }}>
          Login
        </Button>
      </TouchableOpacity> */}
      <StyledButton
        onPress={onLoginAttempt}
        text="Login"
        color={isDisabled ? COLORS.gray : COLORS.white2}
        loader={loading}
        disabled={isDisabled}
      />
      <Text my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </Text>
      <HStack justifyContent="center" space="10" alignItems="center">
        <GoogleIcon />
        <Divider thickness="1" mx="2" orientation="vertical" />
        <FacebookIcon />
      </HStack>
      <Text
        fontFamily="Lato-Regular"
        mt="8"
        textAlign="center"
        alignItems="center">
        New to FaceSmash?{' '}
        <Text
          onPress={() => navigation.navigate('Sign Up')}
          mt="10"
          fontFamily="Lato-Bold"
          color="primary.400">
          Register
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 10,
    // paddingBottom: 20,
    backgroundColor: COLORS.mainBackground,
  },
  textInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: 'white',
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
  textInputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  btnDefault: {
    borderColor: COLORS.white2,
    borderWidth: 2,
    borderRadius: 50,
    padding: 2,
  },
});
