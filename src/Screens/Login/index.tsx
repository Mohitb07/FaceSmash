import React, {useEffect, useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native'

import {Divider, HStack, Image, Text, View, VStack} from 'native-base'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import StyledButton from '../../components/Button'
import StyledError from '../../components/Error'
import {COLORS} from '../../constants'
import {FIREBASE_ERRORS} from '../../firebase/errors'
import useLogin from '../../hooks/useLogin'
import {FacebookIcon, GoogleIcon} from '../../SVG'
import {checkIsEmailValid} from '../../utils'
import {RootStackParamList} from '../../Navigation/Root'

type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Get Started'
>

const Login: React.FC<LoginScreenNavigationProp> = ({
  navigation,
}: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {onLoginAttempt, loading, error, setError} = useLogin()
  const invalidEmail = checkIsEmailValid(email)
  const isDisabled =
    email.length === 0 || password.length === 0 || invalidEmail || loading
  const invalidEmailError = email.length > 0 && invalidEmail

  useEffect(() => {
    error && setError('')
  }, [email, password])

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
          source={require('../../../assets/login2.png')}
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
            style={[
              styles.textInput,
              error.length > 0 && styles.textInputError,
            ]}
            maxLength={30}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <StyledError
            message={
              (invalidEmailError && 'Invalid Email') ||
              FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]
            }
          />
        </View>
        <View>
          <TextInput
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={COLORS.white2}
            style={[
              styles.textInput,
              error.length > 0 && styles.textInputError,
            ]}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <StyledError
            message={FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]}
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

      <StyledButton
        onPress={() => onLoginAttempt(email, password)}
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
  )
}

type Style = {
  container: ViewStyle
  textInput: TextStyle
  textInputError: TextStyle
}

export default Login

const styles = StyleSheet.create<Style>({
  container: {
    padding: 25,
    paddingTop: 10,

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
  // btnDefault: {
  //   borderColor: COLORS.white2,
  //   borderWidth: 2,
  //   borderRadius: 50,
  //   padding: 2,
  // },
})
