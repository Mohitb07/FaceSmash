import React from 'react'

import auth from '@react-native-firebase/auth'
import {HStack, Spinner} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

import StyledButton from '@/components/Button'
import {RootStackParamList} from '@/Navigation/Root'
import {COLORS, USERS_COLLECTION} from '@/constants'
import {EditIcon} from '@/SVG'
import {UserConnectionResult} from '@/Screens/Profile/Followers'

type ConnectionProps = {
  userId: string
  userFollowersList: UserConnectionResult[]
  loading: boolean
}

const Connection: React.FC<ConnectionProps> = ({
  userId,
  userFollowersList = [],
  loading,
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const authUserId = auth().currentUser?.uid
  if (loading) {
    return <Spinner />
  }
  const isFollowing =
    authUserId && !!userFollowersList.find(item => item.uid === authUserId)
  const btnTextValue = isFollowing ? 'Unfollow' : 'Follow'

  const handleEditProfile = () => navigate('UpdateProfile')

  const handleConnection = async () => {
    const userDocRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(authUserId)
      .collection('followings')
    const followingUserRef = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection('followers')

    if (!isFollowing) {
      try {
        await userDocRef.doc(userId).set({
          user: firestore().doc(`${USERS_COLLECTION}/${userId}`),
        })
        await followingUserRef.doc(authUserId).set({
          user: firestore().doc(`${USERS_COLLECTION}/${authUserId}`),
        })
      } catch (err) {
        console.log('error while following', err)
      }
    }
    if (isFollowing) {
      try {
        await userDocRef.doc(userId).delete()
        await followingUserRef.doc(authUserId).delete()
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
