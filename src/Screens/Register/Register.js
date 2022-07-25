import React, {useEffect, useState} from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {View, Text, HStack, VStack, Button, Divider, Image} from 'native-base';

import {COLORS} from '../../constants';
import {FacebookIcon, GoogleIcon} from '../../SVG';
import StyledError from '../../components/Error';
import {FIREBASE_ERRORS} from '../../firebase/errors';
import {useRegister} from '../../hooks/register';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [charactersLeft, setCharactersLeft] = useState(30);
  const [focus, setFocus] = useState(false);

  const {onRegisterAttempt, error, setError, loading} = useRegister();

  const isDisabled =
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    username.length === 0 ||
    password !== confirmPassword;

  const confirmPasswordErrorMsg =
    confirmPassword.length > 0 &&
    confirmPassword !== password &&
    'Password do not match';

  const signUpAttempt = () => {
    onRegisterAttempt({email, password, username, setFocus});
  };

  useEffect(() => {
    setError(prev => ({
      ...prev,
      password: '',
    }));
  }, [password]);

  useEffect(() => {
    setError(prev => ({
      ...prev,
      email: '',
    }));
  }, [email]);

  const handleUsername = text => {
    if (text.length > 30) return;
    setUsername(text);
    setCharactersLeft(30 - text.length);
  };

  const isFocus = !focus &&
    !isDisabled && {
      borderColor: COLORS.white2,
      borderWidth: 2,
      rounded: 'full',
    };

  const defaultFocus = {
    borderColor: COLORS.transparent,
    borderWidth: 2,
    rounded: 'full',
    padding: '0.5',
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View alignItems="center" justifyContent="center">
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
        Sign Up
      </Text>

      <VStack space="5" mt="6">
        <View>
          <TextInput
            placeholder="Username"
            placeholderTextColor={COLORS.white2}
            value={username}
            onChangeText={handleUsername}
            style={[
              styles.textInput,
              charactersLeft === 0 && styles.textInputError,
            ]}
            maxLength={30}
          />
          <StyledError
            errorStyle={{
              color: charactersLeft > 0 ? 'white' : 'red',
              fontSize: 10,
              marginLeft: 15,
            }}
            message={`${charactersLeft} characters remaining`}
          />
        </View>
        <View>
          <TextInput
            placeholder="Email ID"
            placeholderTextColor={COLORS.white2}
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.textInput, error.email && styles.textInputError]}
            maxLength={30}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <StyledError message={FIREBASE_ERRORS[error.email]} />
        </View>
        <View>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={COLORS.white2}
            style={[styles.textInput, error.password && styles.textInputError]}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <StyledError message={FIREBASE_ERRORS[error.password]} />
        </View>
        <View>
          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.white2}
            style={[
              styles.textInput,
              Boolean(confirmPasswordErrorMsg) && styles.textInputError,
            ]}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <StyledError message={confirmPasswordErrorMsg} />
        </View>
      </VStack>
      {/* <Text
        fontFamily="Lato-Regular"
        textAlign="right"
        my="5"
        color="primary.400">
        Forgot Password ?
      </Text> */}

      <View {...defaultFocus} {...isFocus} mt="3">
        <Button
          height="12"
          borderRadius="full"
          onPress={signUpAttempt}
          backgroundColor={isDisabled ? COLORS.gray : COLORS.white2}
          borderColor={COLORS.white2}
          disabled={isDisabled}
          isLoading={loading}
          _text={{
            color: COLORS.background,
            fontFamily: 'Lato-Regular',
          }}>
          Sign Up
        </Button>
      </View>
      <Text my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </Text>
      <HStack justifyContent="center" space="10" alignItems="center">
        <TouchableOpacity>
          <GoogleIcon />
        </TouchableOpacity>
        <Divider thickness="1" mx="2" orientation="vertical" />
        <TouchableOpacity>
          <FacebookIcon />
        </TouchableOpacity>
      </HStack>
      <Text
        fontFamily="Lato-Regular"
        mt="8"
        textAlign="center"
        alignItems="center">
        Already a member?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          mt="10"
          fontFamily="Lato-Bold"
          color="primary.400">
          Login
        </Text>
      </Text>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 0,
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
});
