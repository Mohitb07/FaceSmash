import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Actionsheet, Box, Text as NText} from 'native-base'
import auth from '@react-native-firebase/auth'
import {useResetRecoilState} from 'recoil'

import {bottomSheetState} from '@/atoms/bottomSheetAtom'
import useAuthUser from '@/hooks/useAuthUser'
import {LogoutIcon} from '@/SVG'
import useUserData from '@/hooks/useUserData'

const ProfileBottomSheet = () => {
  const {user} = useAuthUser()
  const {dispatchContextUser} = useUserData()
  const setBottom = useResetRecoilState(bottomSheetState)

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user logged out')
        setBottom()
        dispatchContextUser(null)
      })
      .catch(err => console.log('SIGN OUT ERROR', err))
  }

  return (
    <>
      <Box w="100%" h={60} px={4} justifyContent="center">
        <NText
          fontFamily="Lato-Semibold"
          fontSize="20"
          color="gray.500"
          _dark={{
            color: 'gray.300',
          }}>
          Personal Settings
        </NText>
      </Box>
      {!!user && (
        <Actionsheet.Item style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btn} onPress={onLogoutAttempt}>
            <LogoutIcon style={styles.logoutIcon} />
            <NText color="red.500" fontFamily="Font-Semibold">
              Log Out
            </NText>
          </TouchableOpacity>
        </Actionsheet.Item>
      )}
    </>
  )
}

export default ProfileBottomSheet

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    backgroundColor: 'none',
  },
  logoutIcon: {
    marginRight: 5,
  },
})
