import React, {useEffect, useState, FC} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {Image, Text, View, VStack} from 'native-base'

import StyledButton from '@/components/Button'
import {COLORS} from '@/constants'
import {FIREBASE_ERRORS} from '@/firebase/errors'
import {useRegister} from '@/hooks/useRegister'
import Input from '@/components/Input'
import AuthScreenNavigationLink from '@/components/AuthFooter'
import SocialLogins from '@/components/SocialLogins'

const REGISTER_SCREEN_ASSET = '../../../assets/register.png'

const Register: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameData, setUsernameData] = useState({
    username: '',
    charactersLeft: 30,
  })
  const {onRegisterAttempt, error, setError, loading} = useRegister()

  useEffect(() => {
    setError(prev => ({
      ...prev,
      password: '',
    }))
  }, [password])

  useEffect(() => {
    setError(prev => ({
      ...prev,
      email: '',
    }))
  }, [email])

  const isDisabled =
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    confirmPassword.trim().length === 0 ||
    usernameData.username.trim().length === 0 ||
    password.trim() !== confirmPassword.trim() ||
    loading

  const confirmPasswordErrorMsg =
    Boolean(confirmPassword) && confirmPassword !== password
      ? 'Password must match'
      : ''

  const signUpAttempt = () =>
    onRegisterAttempt(email, password, usernameData.username)

  const handleUsername = (text: string) => {
    if (text.length > 30) return
    setUsernameData({
      charactersLeft: 30 - text.length,
      username: text,
    })
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View p="2" alignItems="center">
        <Image
          source={require(REGISTER_SCREEN_ASSET)}
          alt="Register Illustration"
        />
      </View>
      <Text fontSize="4xl" fontFamily="Lato-Medium">
        Sign Up
      </Text>

      <VStack space="5" mt="6">
        <Input
          value={usernameData.username}
          placeholder="Username"
          onChangeText={handleUsername}
          maxLength={30}
          error={`${usernameData.charactersLeft} characters remaining`}
          errorLabelStyle={{
            color:
              usernameData.charactersLeft > 0 ? COLORS.lightGray2 : COLORS.red,
            fontSize: 10,
            marginLeft: 15,
          }}
          inputStyle={{
            borderColor:
              usernameData.charactersLeft === 0 ? COLORS.red : 'transparent',
          }}
        />
        <Input
          placeholder="Email ID"
          value={email}
          onChangeText={setEmail}
          error={FIREBASE_ERRORS[error.email as keyof typeof FIREBASE_ERRORS]}
          maxLength={30}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          error={
            FIREBASE_ERRORS[error.password as keyof typeof FIREBASE_ERRORS]
          }
        />
        <Input
          secureTextEntry
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={confirmPasswordErrorMsg}
        />
      </VStack>
      <StyledButton
        onPress={signUpAttempt}
        text="Sign Up"
        bgColor={isDisabled ? COLORS.gray : COLORS.white2}
        loader={loading}
        disabled={isDisabled}
      />
      <Text my="6" textAlign="center" fontFamily="Lato-Regular">
        Or, login with...
      </Text>
      <SocialLogins />
      <AuthScreenNavigationLink
        screen="Login"
        subtitle="Already a member?"
        screenLabel="Login"
      />
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 0,
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
