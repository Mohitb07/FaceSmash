import React, {useEffect, useState} from 'react'

import {FlatList, Text, View} from 'native-base'
import firestore from '@react-native-firebase/firestore'

import Screen from '@/components/Screen'
import User from '@/components/User'
import {USERS_COLLECTION} from '@/constants'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'
import {IUserDetail} from '@/interface'

export interface UserConnectionResult {
  userId: string
  username: string
  email: string
  uri: string
  followers?: string[]
}

type FollowingsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Followings'
>

const Followings: React.FC<FollowingsScreenNavigationProps> = ({route}) => {
  const {followingsList} = route.params || null
  const [followingData, setFollowingData] = useState<IUserDetail[]>([])
  useEffect(() => {
    async function getFollowers() {
      followingsList.map(async userId => {
        const res = await firestore()
          .collection(USERS_COLLECTION)
          .doc(userId)
          .get()
        setFollowingData(prev => [...prev, res.data() as IUserDetail])
      })
    }
    getFollowers()
  }, [followingsList])

  const render = ({
    item,
  }: {
    item: Pick<IUserDetail, 'profilePic' | 'username' | 'uid' | 'email'>
  }) => (
    <User
      uri={item.profilePic}
      username={item.username}
      userId={item.uid}
      email={item.email}
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
