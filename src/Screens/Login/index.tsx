import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Image, Text, View, VStack} from 'native-base'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, setError])

  const errorMsg = FIREBASE_ERRORS[error as keyof typeof FIREBASE_ERRORS]

  const loginAttempt = () => onLoginAttempt(email.value, password)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View p="2" alignItems="center">
        <Image source={require(LOGIN_SCREEN_ASSET)} alt="Login Illustration" />
      </View>
      <Text fontSize="4xl" fontFamily="Lato-Medium">
        Login
      </Text>
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
      <Text
        fontFamily="Lato-Regular"
        textAlign="right"
        my="3"
        color="primary.600">
        Forgot Password ?
      </Text>
      <StyledButton
        onPress={loginAttempt}
        text="Login"
        bgColor={isDisabled ? COLORS.gray : COLORS.white2}
        loader={loading}
        disabled={isDisabled}
      />
      <Text my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </Text>
      <SocialLogins />
      <AuthScreenNavigationLink
        screen="SignUp"
        subtitle="New to FaceSmash?"
        screenLabel="Register"
      />
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 10,
    backgroundColor: COLORS.black,
  },
})
