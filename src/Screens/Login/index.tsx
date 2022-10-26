import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, TextStyle, ViewStyle} from 'react-native'

import {Divider, HStack, Image, Text as NText, View, VStack} from 'native-base'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import StyledButton from '@/components/Button'
import {COLORS} from '@/constants'
import useLogin from '@/hooks/useLogin'
import {checkIsEmailValid} from '@/utils'
import {RootStackParamList} from '@/Navigation/Root'
import GoogleLogin from '@/components/SocialLogins/Google'
import FacebookLogin from '@/components/SocialLogins/Facebook'
import Input from '@/components/Input'
import {FIREBASE_ERRORS} from '@/firebase/errors'

type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>
const LOGIN_SCREEN_ASSET = '../../../assets/login.png'

const Login: React.FC<LoginScreenNavigationProp> = ({
  navigation: {navigate},
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {onLoginAttempt, loading, error, setError} = useLogin()
  const isEmailInvalid = email.trim().length > 0 && checkIsEmailValid(email)
  const isDisabled =
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    isEmailInvalid ||
    loading

  useEffect(() => {
    error && setError('')
  }, [email, password])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View p="2" alignItems="center">
        <Image source={require(LOGIN_SCREEN_ASSET)} alt="Login Illustration" />
      </View>
      <NText fontSize="4xl" fontFamily="Lato-Medium">
        Login
      </NText>
      <VStack space="5" mt="6">
        <Input
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email ID"
          isInvalid={isEmailInvalid}
          error={FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]}
          errorMessage="Invalid Email"
          keyboardType="email-address"
          maxLength={30}
        />
        <Input
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          error={FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]}
        />
      </VStack>
      <NText
        fontFamily="Lato-Regular"
        textAlign="right"
        my="3"
        color="primary.400">
        Forgot Password ?
      </NText>

      <StyledButton
        onPress={() => onLoginAttempt(email, password)}
        text="Login"
        bgColor={isDisabled ? COLORS.gray : COLORS.white2}
        loader={loading}
        disabled={isDisabled}
      />
      <NText my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </NText>
      <HStack justifyContent="center" space="10" alignItems="center">
        <GoogleLogin />
        <Divider thickness="1" mx="2" orientation="vertical" />
        <FacebookLogin />
      </HStack>
      <NText
        fontFamily="Lato-Regular"
        mt="8"
        textAlign="center"
        alignItems="center">
        New to FaceSmash?{' '}
        <NText
          onPress={() => navigate('SignUp')}
          mt="10"
          fontFamily="Lato-Bold"
          color="primary.400">
          Register
        </NText>
      </NText>
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
    color: COLORS.white,
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
  textInputError: {
    borderColor: COLORS.red,
    borderWidth: 1,
  },
})
