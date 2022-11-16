import React from 'react'

import {FlatList, Text, View} from 'native-base'

import Screen from '@/components/Screen'
import User from '@/components/User'

const FOLLOWINGS_RESULT = [
  {
    uri: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    username: 'Mohitb07',
    email: 'bmohit980@gmail.com',
    userId: 'faldfasdf',
  },
  {
    uri: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    username: 'Mohitb07',
    email: 'bmohit980@gmail.com',
    userId: 'faldfasdf31231',
  },
]

export interface UserConnectionResult {
  userId: string
  username: string
  email: string
  uri: string
  followers?: string[]
}

const Followings: React.FC = () => {
  const render = ({item}: {item: UserConnectionResult}) => (
    <User
      uri={item.uri}
      username={item.username}
      userId={item.userId}
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
        <FlatList data={FOLLOWINGS_RESULT} renderItem={render} />
      </View>
    </Screen>
  )
}
export default Followings
