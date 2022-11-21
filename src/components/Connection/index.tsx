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
import {UserConnectionResult} from '@/Screens/Profile/Followers'

// type User = IUserDetail & {
//   _data?: {
//     uid: string
//   }
// }
type ConnectionProps = {
  userId: string
  userFollowersList: UserConnectionResult[]
}

const Connection: React.FC<ConnectionProps> = ({
  userId,
  userFollowersList = [],
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const authUserId = auth().currentUser?.uid

  const isFollowing =
    authUserId && userFollowersList.map(item => item._data!.uid === authUserId)
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
          user: userId,
        })
        await followingUserRef.doc(authUserId).set({
          user: authUserId,
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
