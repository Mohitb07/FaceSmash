import React from 'react'
import {ActivityIndicator} from 'react-native'

import {FlatList, Text, View} from 'native-base'

import Screen from '@/components/Screen'
import User from '@/components/User'
import {COLORS} from '@/constants'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '@/Navigation/Root'
import {UserGroup} from '@/SVG'
import {useConnections} from '@/hooks/useConnections'

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
  const {loading, followingsList} = useConnections({
    userId: uid,
  })
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
        <FlatList
          data={followingsList}
          renderItem={render}
          ListEmptyComponent={() =>
            !loading && followingsList.length < 0 ? (
              <View justifyItems="center" alignItems="center">
                <UserGroup height="50px" width="50px" />
                <Text
                  textAlign="center"
                  fontFamily="Lato-Regular"
                  fontSize="md">
                  You are not following anyone
                </Text>
              </View>
            ) : (
              <ActivityIndicator size="large" color={COLORS.primary} />
            )
          }
        />
      </View>
    </Screen>
  )
}
export default Followings
