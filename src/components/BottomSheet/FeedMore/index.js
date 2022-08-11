import {Actionsheet, Box, Icon, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {AuthUserContext} from '../../../Context/auth'
import {FeedEditIcon, DeleteIcon, FeedShareIcon} from '../../../SVG'
import firestore from '@react-native-firebase/firestore'
import {useRecoilState} from 'recoil'
import {postState} from '../../../atoms/postAtom'
import {userDataState} from '../../../atoms/userAtom'

const FeedMore = ({postId, handleDelete}) => {
  const {authUser} = useContext(AuthUserContext)
  const [postStateValue, setPostStateValue] = useRecoilState(postState)
  const [userStateValue, setUserStateValue] = useRecoilState(userDataState)

  const handleDeletePost = () => {
    firestore()
      .collection('Posts')
      .doc(postId)
      .delete()
      .then(() => {
        handleDelete()
        setPostStateValue(prev => ({
          ...prev,
          posts: postStateValue.posts.filter(post => post.key !== postId),
        }))
        if (userStateValue.posts.length > 0) {
          console.log('deleting profile data')
          setUserStateValue(prev => ({
            ...prev,
            posts: userStateValue.posts.filter(post => post.key !== postId),
          }))
        }
        console.log('Post deleted!')
      })
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
          Post Detail
        </NText>
      </Box>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={FeedEditIcon} mr="1" size="5" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontFamily="Lato-Semibold">
            Edit Post
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={FeedShareIcon} name="share" mr="1" size="5" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontFamily="Lato-Semibold">
            Share Post
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      {!!authUser && (
        <Actionsheet.Item
          startIcon={<Icon as={DeleteIcon} mr="1" size="5" />}
          style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btnLogout} onPress={handleDeletePost}>
            <NText color="red.700" fontFamily="Lato-Semibold">
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
