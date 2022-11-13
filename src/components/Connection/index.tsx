import React from 'react'

import auth from '@react-native-firebase/auth'
import {HStack} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

import StyledButton from '@/components/Button'
import {RootStackParamList} from '@/Navigation/Root'
import {COLORS, USERS_COLLECTION} from '@/constants'
import {EditIcon} from '@/SVG'

type ConnectionProps = {
  userId: string
  userFollowersList: string[]
}

const Connection: React.FC<ConnectionProps> = ({userId, userFollowersList}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const authUserId = auth().currentUser?.uid

  const isFollowing = authUserId && userFollowersList.includes(authUserId)
  const btnTextValue = isFollowing ? 'Unfollow' : 'Follow'

  const handleEditProfile = () => navigate('UpdateProfile')

  const handleConnection = async () => {
    const userDocRef = firestore().collection(USERS_COLLECTION).doc(authUserId)
    const followingUserRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
    if (!isFollowing) {
      try {
        await userDocRef.set(
          {
            followings: firestore.FieldValue.arrayUnion(userId),
          },
          {merge: true},
        )
        await followingUserRef.set(
          {
            followers: firestore.FieldValue.arrayUnion(authUserId),
          },
          {merge: true},
        )
      } catch (err) {
        console.log('error while following', err)
      }
    }
    if (isFollowing) {
      // remove followers
      try {
        await userDocRef.set(
          {
            followings: firestore.FieldValue.arrayRemove(userId),
          },
          {merge: true},
        )
        await followingUserRef.set(
          {
            followers: firestore.FieldValue.arrayRemove(authUserId),
          },
          {merge: true},
        )
      } catch (err) {
        console.log('ERROR while unfollowing', err)
      }
    }
  }

  return (
    <HStack alignItems="center" space="10">
      {authUserId === userId ? (
        <StyledButton
          onPress={handleEditProfile}
          text="Edit Profile"
          showRing={false}
          bgColor={COLORS.white2}
          icon={<EditIcon fill={COLORS.black} />}
        />
      ) : (
        <StyledButton
          onPress={handleConnection}
          text={btnTextValue}
          showRing={false}
          bgColor={COLORS.white2}
        />
      )}
    </HStack>
  )
}
export default Connection
