import React from 'react'

import {FlatList, Text, View} from 'native-base'

import Screen from '@/components/Screen'
import User from '@/components/User'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'
import {UserGroup} from '@/SVG'
import {useConnections} from '@/hooks/useConnections'

export interface UserConnectionResult {
  uid: string
  username: string
  email: string
  profilePic: string
}

type FollowingsScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Followings'
>

const Followings: React.FC<FollowingsScreenNavigationProps> = ({route}) => {
  const {uid} = route.params || null
  const {followingsList} = useConnections({
    userId: uid,
  })
  console.log('followings', followingsList)
  const render = ({item}: {item: UserConnectionResult}) => (
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
        <FlatList
          data={followingsList}
          renderItem={render}
          ListEmptyComponent={() => (
            <View justifyItems="center" alignItems="center">
              <UserGroup height="50px" width="50px" />
              <Text textAlign="center" fontFamily="Lato-Regular" fontSize="md">
                You are not following anyone
              </Text>
            </View>
          )}
        />
      </View>
    </Screen>
  )
}
export default Followings
