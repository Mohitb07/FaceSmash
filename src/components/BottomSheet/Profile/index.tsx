import auth from '@react-native-firebase/auth'
import {Actionsheet, Box, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {useResetRecoilState} from 'recoil'
import {bottomSheetState} from '../../../atoms/bottomSheetAtom'
import {AuthUserContext} from '../../../Context/auth'
import {DocumentIcon, LogoutIcon, PrivacyIcon} from '../../../SVG'

const ProfileBottomSheet = () => {
  const {user} = useContext(AuthUserContext)
  const setBottom = useResetRecoilState(bottomSheetState)

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user logged out')
        setBottom()
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
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btn}>
          <DocumentIcon style={{marginRight: 5}} />
          <NText color="white" fontFamily="Font-Semibold">
            Settings and Privacy
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btn}>
          <PrivacyIcon style={{marginRight: 5}} />
          <NText color="white" fontFamily="Font-Semibold">
            Settings and Privacy
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      {!!user && (
        <Actionsheet.Item style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btn} onPress={onLogoutAttempt}>
            <LogoutIcon style={{marginRight: 5}} />
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
})
