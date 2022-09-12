import {Actionsheet, Box, Icon, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {AuthUserContext} from '../../../Context/auth'
import {FeedEditIcon, DeleteIcon, FeedShareIcon} from '../../../SVG'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

const FeedMore = ({postId, onClose, hasImage, imageRef, hasLiked}) => {
  const {user} = useContext(AuthUserContext)
  console.log('has imageRef', imageRef)
  const handleDeletePost = async () => {
    // remove image from storage if an image exists (DONE)
    // remove doc from postlikes subcollection if present
    firestore()
      .collection('Posts')
      .doc(postId)
      .delete()
      .then(async () => {
        onClose()
        if (hasImage) {
          await storage()
            .ref(imageRef)
            .delete()
            .then(() => {
              console.log('storage cleanup complete')
            })
        }
        if (hasLiked) {
          const postlikesRef = firestore()
            .collection('Users')
            .doc(user?.uid)
            .collection('postlikes')
            .doc(postId)
          postlikesRef.delete()
        }
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
      {!!user && (
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
