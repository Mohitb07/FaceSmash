import React from 'react'

import {FlatList, Text, View} from 'native-base'

import Screen from '@/components/Screen'
import User from '@/components/User'
import {UserConnectionResult} from '../Followings'

const FOLLOWERS_RESULT = [
  {
    uri: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    username: 'Mohitb07',
    email: 'bmohit980@gmail.com',
    userId: 'faldfasdf',
    followers: ['fasdf', '2fasdf'],
  },
  {
    uri: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
    username: 'Mohitb07',
    email: 'bmohit980@gmail.com',
    userId: 'faldfasdf31231',
    followers: ['fasdf', '2fasdf', 'myId'],
  },
]
const Followers: React.FC = () => {
  const render = ({item}: {item: Required<UserConnectionResult>}) => (
    <User
      uri={item.uri}
      username={item.username}
      userId={item.userId}
      email={item.email}
      hasFollowBtn={!item.followers.includes('myId')}
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
        <FlatList data={FOLLOWERS_RESULT} renderItem={render} />
      </View>
    </Screen>
  )
}
export default Followers
