import React from 'react'

import {FlatList, Text, View} from 'native-base'

import Screen from '@/components/Screen'
import User from '@/components/User'
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

type FollowersScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Followers'
>

const Followers = ({route}: FollowersScreenNavigationProps) => {
  const {followersList} = route.params || null
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
          Followers
        </Text>
      </View>
      <View p={3}>
        <FlatList
          ListEmptyComponent={() => <Text>No Followers Found</Text>}
          data={followersList}
          renderItem={render}
        />
      </View>
    </Screen>
  )
}
export default Followers
