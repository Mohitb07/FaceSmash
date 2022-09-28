import React, {useState} from 'react'
import {StyleSheet} from 'react-native'

import {Box, Button, Image, Text, View, useToast} from 'native-base'
import auth from '@react-native-firebase/auth'

import {IAuthUser} from '../../Context/auth'
import {COLORS} from '../../constants'
import {ReSendIcon, VerifyIcon} from '../../SVG'
import useAuthUser from '../../hooks/useAuthUser'

const Verification = () => {
  const toast = useToast()
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [loadingResend, setLoadingResend] = useState(false)
  const {user, setAuthUser} = useAuthUser()

  const sendEmailVerifiationLink = () => {
    setLoadingResend(true)
    auth()
      .currentUser?.sendEmailVerification()
      .then(() => {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="2" rounded="sm">
                Verification link sent to the registered email address
              </Box>
            )
          },
        })
      })
      .catch(err => {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="2" rounded="sm">
                {err}
              </Box>
            )
          },
        })
      })
      .finally(() => {
        setLoadingResend(false)
      })
  }

  const checkUserVerificationStatus = async () => {
    setLoadingVerify(true)
    if (!!user && !user?.emailVerified) {
      console.log('checking verification status interval')
      await auth().currentUser?.reload()
      const user = auth()?.currentUser
      if (user?.emailVerified) {
        setLoadingVerify(false)
        setAuthUser((prev: IAuthUser) => ({
          ...prev,
          user: user,
        }))
      } else {
        setLoadingVerify(false)
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px="2" py="2" rounded="sm">
                Your Email is not verified.
              </Box>
            )
          },
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View alignItems="center" justifyContent="center">
          <Image
            style={{
              height: 360,
              width: 360,
            }}
            source={require('../../../assets/person-sitting.png')}
            alt="Illustration"
          />
        </View>
        <Text fontSize="3xl" fontFamily="Lato-Heavy">
          Check Your Email
        </Text>
        <Button
          my="5"
          isLoading={loadingVerify}
          disabled={loadingResend || loadingVerify}
          flex={1}
          minHeight="12"
          width="100%"
          height="12"
          leftIcon={<VerifyIcon fill={COLORS.primary} />}
          borderRadius="full"
          backgroundColor={COLORS.white2}
          borderColor={COLORS.white2}
          onPress={checkUserVerificationStatus}
          _text={{
            color: COLORS.background,
            fontFamily: 'Lato-Heavy',
            fontSize: '13px',
          }}>
          Verify
        </Button>

        <Button
          flex={1}
          isLoading={loadingResend}
          disabled={loadingResend || loadingVerify}
          minHeight="12"
          width="100%"
          height="12"
          borderRadius="full"
          backgroundColor="#202124"
          borderColor={COLORS.white2}
          leftIcon={
            <ReSendIcon fill={COLORS.primary} height="12px" width="15px" />
          }
          onPress={sendEmailVerifiationLink}
          _text={{
            color: COLORS.primary,
            fontFamily: 'Lato-Heavy',
            fontSize: '13px',
          }}>
          Re Send
        </Button>
      </View>
    </View>
  )
}

export default Verification

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 10,
    backgroundColor: COLORS.mainBackground,
    flex: 1,
  },
})
