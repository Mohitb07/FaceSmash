import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {Actionsheet, Box, Icon, Text as NText} from 'native-base'
import React, {useContext} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {AuthUserContext} from '../../../Context/auth'
import {DeleteIcon} from '../../../SVG'

interface IFeedMoreProps {
  postId: string
  onClose: () => void
  hasImage: boolean
  imageRef?: string
  hasLiked: boolean
}

const FeedMore = ({
  postId,
  onClose,
  hasImage,
  imageRef,
  hasLiked,
}: IFeedMoreProps) => {
  const {user} = useContext(AuthUserContext)
  console.log('has imageRef', imageRef)
  const handleDeletePost = async () => {
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
      {!!user && (
        <Actionsheet.Item
          startIcon={<Icon as={DeleteIcon} mr="1" size="5" />}
          style={styles.defaultStyle}>
          <TouchableOpacity onPress={handleDeletePost}>
            <NText color="red.700" fontFamily="Lato-Semibold">
              Delete Post
            </NText>
          </TouchableOpacity>
        </Actionsheet.Item>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: 'none',
  },
})

export default React.memo(FeedMore)
