import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native'

import {Divider, HStack, Image, Text, View, VStack} from 'native-base'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import StyledButton from '@/components/Button'
import StyledError from '@/components/Error'
import {COLORS} from '@/constants'
import {FIREBASE_ERRORS} from '@/firebase/errors'
import {useRegister} from '@/hooks/useRegister'
import {RootStackParamList} from '@/Navigation/Root'
import {FacebookIcon, GoogleIcon} from '@/SVG'

type LoginScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>

const Register = ({navigation}: LoginScreenNavigationProp) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [charactersLeft, setCharactersLeft] = useState(30)

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
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    username.length === 0 ||
    password !== confirmPassword ||
    loading

  const confirmPasswordErrorMsg =
    Boolean(confirmPassword) && confirmPassword !== password
      ? 'Password must match'
      : ''

  const signUpAttempt = () => {
    onRegisterAttempt(email, password, username)
  }

  const handleUsername = (text: string) => {
    if (text.length > 30) return
    setUsername(text)
    setCharactersLeft(30 - text.length)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View p="2" alignItems="center">
        <Image
          source={require('@/../assets/register.png')}
          alt="Register Illustration"
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
            style={[
              styles.textInput,
              Boolean(error.email) && styles.textInputError,
            ]}
            maxLength={30}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <StyledError
            message={
              FIREBASE_ERRORS[error.email as keyof typeof FIREBASE_ERRORS]
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
              Boolean(error.password) && styles.textInputError,
            ]}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <StyledError
            message={
              FIREBASE_ERRORS[error.password as keyof typeof FIREBASE_ERRORS]
            }
          />
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
  )
}

export default Register

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
})
