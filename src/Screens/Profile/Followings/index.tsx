import React, {useEffect, useState} from 'react'

import {FlatList, Text, View} from 'native-base'
import firestore from '@react-native-firebase/firestore'

import Screen from '@/components/Screen'
import User from '@/components/User'
import {USERS_COLLECTION} from '@/constants'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'

export interface UserConnectionResult {
  _data: {
    uid: string
    username: string
    email: string
    profilePic: string
  }
}

type FollowingsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Followings'
>

const Followings: React.FC<FollowingsScreenNavigationProps> = ({route}) => {
  const {uid} = route.params || null
  const [followingData, setFollowingData] = useState<UserConnectionResult[]>([])
  useEffect(() => {
    async function getFollowers() {
      const res = await firestore()
        .collection(USERS_COLLECTION)
        .doc(uid)
        .collection('followings')
        .get()

      const promises = res.docs.map(userId => userId.data().user.get())
      Promise.all(promises).then(result => setFollowingData(result))
    }
    getFollowers()
  }, [uid])

  const render = ({item}: {item: UserConnectionResult}) => (
    <User
      uri={item._data.profilePic}
      username={item._data.username}
      userId={item._data.uid}
      email={item._data.email}
    />
  )
  return (
    <Screen>
      <View px={5}>
        <Text fontSize="2xl" fontFamily="Lato-Heavy">
          Followings
        </Text>
      </View>
      <View p={3}>
        <FlatList data={followingData} renderItem={render} />
      </View>
    </Screen>
  )
}
export default Followings
