import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Actionsheet, Box, Icon, Text} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import useAuthUser from '@/hooks/useAuthUser'
import {DeleteIcon} from '@/SVG'
import {POSTS_COLLECTION, USERS_COLLECTION} from '@/constants'

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
  const {user} = useAuthUser()
  console.log('has imageRef', imageRef)
  const handleDeletePost = async () => {
    if (postId) {
      firestore()
        .collection(POSTS_COLLECTION)
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
              .collection(USERS_COLLECTION)
              .doc(user?.uid)
              .collection('postlikes')
              .doc(postId)
            postlikesRef.delete()
          }
        })
    }
  }

  return (
    <>
      <Box w="100%" h={60} px={4} justifyContent="center">
        <Text
          fontFamily="Lato-Semibold"
          fontSize="20"
          color="gray.500"
          _dark={{
            color: 'gray.300',
          }}>
          Post Detail
        </Text>
      </Box>
      {!!user && (
        <Actionsheet.Item
          startIcon={<Icon as={DeleteIcon} mr="1" size="5" />}
          style={styles.defaultStyle}>
          <TouchableOpacity onPress={handleDeletePost}>
            <Text color="red.700" fontFamily="Lato-Semibold">
              Delete Post
            </Text>
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
