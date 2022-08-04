import auth from '@react-native-firebase/auth'
import {Actionsheet, Box, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useResetRecoilState} from 'recoil'
import {bottomSheetState} from '../../../atoms/bottomSheetAtom'
import {postState} from '../../../atoms/postAtom'
import {AuthUserContext} from '../../../Context/auth'
import {DocumentIcon, LogoutIcon, PrivacyIcon} from '../../../SVG'

const ProfileBottomSheet = () => {
  const {authUser} = useContext(AuthUserContext)
  const setPostState = useResetRecoilState(postState)
  const setBottom = useResetRecoilState(bottomSheetState)

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user logged out')
        setPostState()
        setBottom()
      })
      .catch(err => console.log('SIGN OUT ERROR', err))
  }

  return (
    <>
      <Box w="100%" h={60} px={4} justifyContent="center">
        <NText
          fontSize="20"
          color="gray.500"
          _dark={{
            color: 'gray.300',
          }}>
          Personal Settings
        </NText>
      </Box>
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btnLogout}>
          <DocumentIcon style={{marginRight: 5}} />
          <Text style={{color: 'white', fontWeight: '600'}}>
            Settings and Privacy
          </Text>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btnLogout}>
          <PrivacyIcon style={{marginRight: 5}} />
          <Text style={{color: 'white', fontWeight: '600'}}>
            Settings and Privacy
          </Text>
        </TouchableOpacity>
      </Actionsheet.Item>
      {!!authUser && (
        <Actionsheet.Item style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btnLogout} onPress={onLogoutAttempt}>
            <LogoutIcon style={{marginRight: 5}} />
            <Text style={{color: 'red', fontWeight: '600'}}>Log Out</Text>
          </TouchableOpacity>
        </Actionsheet.Item>
      )}
    </>
  )
}

export default ProfileBottomSheet

const styles = StyleSheet.create({
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    backgroundColor: 'none',
  },
})
