import {Actionsheet, Box, Icon, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {AuthUserContext} from '../../../Context/auth'
import {DocumentIcon, LogoutIcon, PrivacyIcon} from '../../../SVG'
import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {postState} from '../../../atoms/postAtom'

const FeedMore = ({postId, handleDelete}) => {
  const {authUser} = useContext(AuthUserContext)

  const handleDeletePost = () => {
    firestore()
      .collection('Posts')
      .doc(postId)
      .delete()
      .then(() => {
        handleDelete(true)
        console.log('User deleted!')
      })
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
          Post Detail
        </NText>
      </Box>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={DocumentIcon} mr="1" size="6" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontWeight="semibold">
            Edit Post
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={PrivacyIcon} name="share" mr="1" size="6" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontWeight="semibold">
            Share Post
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      {!!authUser && (
        <Actionsheet.Item
          startIcon={<Icon as={LogoutIcon} mr="1" size="6" />}
          style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btnLogout} onPress={handleDeletePost}>
            <NText color="red.700" fontWeight="semibold">
              Delete Post
            </NText>
          </TouchableOpacity>
        </Actionsheet.Item>
      )}
    </>
  )
}

export default React.memo(FeedMore)

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: 'none',
  },
})
