import React, {useEffect, useState} from 'react'
import {
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputEndEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native'

import {Image, Text as NText, View, VStack} from 'native-base'

import StyledButton from '@/components/Button'
import {COLORS} from '@/constants'
import useLogin from '@/hooks/useLogin'
import {checkIsEmailValid} from '@/utils'
import Input from '@/components/Input'
import {FIREBASE_ERRORS} from '@/firebase/errors'
import AuthScreenNavigationLink from '@/components/AuthFooter'
import SocialLogins from '@/components/SocialLogins'

const LOGIN_SCREEN_ASSET = '../../../assets/login.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState({
    value: '',
    isInvalid: false,
  })
  const [password, setPassword] = useState('')
  const {onLoginAttempt, loading, error, setError} = useLogin()

  const isDisabled =
    email.value.trim().length === 0 ||
    password.trim().length === 0 ||
    email.isInvalid ||
    loading

  useEffect(() => {
    error && setError('')
  }, [email, password])

  const errorMsg = FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]

  const loginAttempt = () => onLoginAttempt(email.value, password)

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
          value={email.value}
          onChangeText={text => setEmail(prev => ({...prev, value: text}))}
          placeholder="Email ID"
          error={(email.isInvalid && 'Invalid Email') || errorMsg}
          keyboardType="email-address"
          maxLength={30}
          onEndEditing={e =>
            setEmail(prev => ({
              ...prev,
              isInvalid: checkIsEmailValid(e.nativeEvent.text),
            }))
          }
        />
        <Input
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          error={errorMsg}
        />
      </VStack>
      <NText
        fontFamily="Lato-Regular"
        textAlign="right"
        my="3"
        color="primary.600">
        Forgot Password ?
      </NText>
      <StyledButton
        onPress={loginAttempt}
        text="Login"
        bgColor={isDisabled ? COLORS.gray : COLORS.white2}
        loader={loading}
        disabled={isDisabled}
      />
      <NText my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </NText>
      <SocialLogins />
      <AuthScreenNavigationLink
        screen="SignUp"
        subtitle="New to FaceSmash?"
        screenLabel="Register"
      />
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
