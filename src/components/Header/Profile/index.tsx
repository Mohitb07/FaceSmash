import {Box, Flex, HStack, Text, View} from 'native-base'
import React, {memo, useEffect, useRef, useState} from 'react'
import {TouchableOpacity} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import {Redis} from '@upstash/redis'
import FastImage from 'react-native-fast-image'

import {COLORS} from '../../../constants'
import {EditIcon, FilterIcon, GridIcon, UserIcon} from '../../../SVG'
import StyledButton from '../../Button'
import {RootStackParamList} from '../../../Navigation/Root'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

const redis = new Redis({
  url: 'https://usw2-welcomed-duckling-30227.upstash.io',
  token:
    'AXYTASQgOWMyNTcwZTQtMzQ3Yy00NWEyLTkzZjktNzM5ZmJkNTdiOWUzNjg4N2RhOGEzMTQwNDc0Nzk0ZGRmNTAwODc4ZWYyMjE=',
})

interface IProfileHeaderProps {
  userId: string
  totalPosts: number
}

interface IUserData {
  bio: string
  createdAt: string
  email: string
  followers: Array<string>
  followings: Array<string>
  key: string
  lastSignIn: string
  profilePic: string
  qusername: string
  uid: string
  username: string
}

const defaultValues = {
  bio: '',
  createdAt: '',
  email: '',
  followers: [],
  followings: [],
  key: '',
  lastSignIn: '',
  profilePic: '',
  qusername: '',
  uid: '',
  username: '',
}

// {"bio": "Front End Engineer", "createdAt": "2022-09-16T17:32:01.168Z", "email": "bmohit980@gmail.com", "followers": [], "followings": [], "key": "6TvlX8oyiXQwNzxhm7Dj3vLuGsr1", "lastSignIn": "2022-09-16T17:32:01.168Z", "profilePic": "https://firebasestorage.googleapis.com/v0/b/facesmash-8ff0b.appspot.com/o/6TvlX8oyiXQwNzxhm7Dj3vLuGsr1%2FprofilePic?alt=media&token=2053901a-69f2-4ab6-9064-e26ace73981d", "qusername": "mohitb07", "uid": "6TvlX8oyiXQwNzxhm7Dj3vLuGsr1", "username": "Mohitb07"}

const ProfileHeader = ({userId, totalPosts = 0}: IProfileHeaderProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [userData, setUserData] = useState<IUserData>(defaultValues)
  const authUser = auth().currentUser?.uid
  const isMounted = useRef(false)
  console.log('userdata', userData)
  useEffect(() => {
    isMounted.current = true
    async function fetchUserData() {
      // const userCache = await redis.get(userId)
      // console.log('user cache', userCache)
      // if (userCache) {
      //   isMounted.current && setUserData(userCache)
      //   return
      // }
      console.log('fetching firebase')
      firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot(
          async snapshot => {
            if (isMounted.current) {
              // await redis.set(
              //   userId,
              //   JSON.stringify({...snapshot.data(), key: snapshot.id}),
              // )
              setUserData({
                ...defaultValues,
                ...snapshot.data(),
                key: snapshot.id,
              })
            }
          },
          error => {
            console.log('user info fetching error', error)
          },
        )
    }
    fetchUserData()
    return () => {
      isMounted.current = false
    }
  }, [userId])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          fontFamily="Lato-Semibold"
          maxW={300}
          numberOfLines={1}
          ellipsizeMode="tail"
          fontSize="lg">
          {userData.username}
        </Text>
      ),
    })
  }, [userData.username])

  return (
    <Box my="2" mb="5" paddingX="2">
      <HStack alignItems="center" justifyContent="space-between">
        <FastImage
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
          }}
          source={{
            uri: userData.profilePic,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <HStack alignItems="center" space="8">
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {totalPosts}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Posts
            </Text>
          </View>
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {userData.followers.length}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Followers
            </Text>
          </View>
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {userData.followings.length}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Following
            </Text>
          </View>
        </HStack>
      </HStack>

      <View my="2" mb="2">
        <Text fontSize="md" letterSpacing="lg" fontFamily="Lato-Regular">
          {userData.username}
        </Text>
        {Boolean(userData.bio) && (
          <HStack alignItems="center">
            <Text fontSize="sm" color={COLORS.gray} fontFamily="Lato-Regular">
              {userData.bio}
            </Text>
          </HStack>
        )}
        <Text
          mt="1"
          fontSize="sm"
          color={COLORS.gray}
          fontFamily="Lato-Regular">
          {userData.email}
        </Text>
      </View>

      <HStack alignItems="center" space="10">
        <StyledButton
          onPress={() => {}}
          text="Follow"
          showRing={false}
          bgColor={COLORS.white2}
        />
        {authUser === userId && (
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateProfile')}>
            <EditIcon />
          </TouchableOpacity>
        )}
      </HStack>

      <HStack
        alignItems="center"
        justifyContent="space-between"
        space="10"
        mt="5">
        <HStack alignItems="center" space="5">
          <Flex direction="row" align="center">
            <GridIcon height="23" width="23" />
            <Text ml="3" fontSize="sm" fontFamily="Lato-Heavy">
              Activity
            </Text>
          </Flex>
          <Flex direction="row" align="center">
            <UserIcon height="23" width="23" />
            <Text
              color={COLORS.gray}
              ml="3"
              fontSize="sm"
              fontFamily="Lato-Regular">
              About
            </Text>
          </Flex>
        </HStack>
        <TouchableOpacity>
          <FilterIcon />
        </TouchableOpacity>
      </HStack>
    </Box>
  )
}

export default memo(ProfileHeader)