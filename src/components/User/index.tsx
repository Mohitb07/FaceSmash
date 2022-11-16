import {COLORS} from '@/constants'
import {RootStackParamList} from '@/Navigation/Root'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Avatar, Button, HStack, Text, View} from 'native-base'
import React from 'react'
import {TouchableOpacity} from 'react-native'

type UserProps = {
  uri: string
  userId: string
  username: string
  email: string
  hasFollowBtn?: boolean
}

const User: React.FC<UserProps> = ({
  uri,
  userId,
  username,
  email,
  hasFollowBtn = false,
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    // will come back to navigation afterward
    <TouchableOpacity
      onPress={() =>
        navigate('Profile', {
          providedUserId: userId,
        })
      }>
      <HStack marginY="1" alignItems="center" justifyContent="space-between">
        <View flexDirection="row" alignItems="center" flex={1}>
          <Avatar
            size="lg"
            borderColor={COLORS.primary}
            mr="3"
            padding="0.5"
            bgColor={COLORS.mainBackground}
            source={{
              uri,
            }}
          />
          <View flex={1}>
            <Text
              color="white"
              fontWeight={600}
              numberOfLines={1}
              ellipsizeMode="tail">
              {username}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              color="gray.500"
              fontWeight={600}>
              {email}
            </Text>
          </View>
        </View>
        {hasFollowBtn && (
          <Button
            size="lg"
            borderRadius="full"
            variant="solid"
            background="white"
            _text={{
              color: 'black',
              fontFamily: 'Lato-Regular',
              fontSize: 'xs',
            }}>
            Follow
          </Button>
        )}
      </HStack>
    </TouchableOpacity>
  )
}
export default User
