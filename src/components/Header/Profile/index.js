import {Box, Flex, HStack, Text, View} from 'native-base'
import React, {memo, useEffect, useRef, useState} from 'react'
import {ActivityIndicator, TouchableOpacity} from 'react-native'

import {Redis} from '@upstash/redis'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'

import {COLORS} from '../../../constants'
import {
  EditIcon,
  FilterIcon,
  GridIcon,
  LightningIcon,
  UserIcon,
} from '../../../SVG'
import StyledButton from '../../Button'

const redis = new Redis({
  url: 'https://usw2-welcomed-duckling-30227.upstash.io',
  token:
    'AXYTASQgOWMyNTcwZTQtMzQ3Yy00NWEyLTkzZjktNzM5ZmJkNTdiOWUzNjg4N2RhOGEzMTQwNDc0Nzk0ZGRmNTAwODc4ZWYyMjE=',
})

const ProfileHeader = ({userId, totalPosts = 0}) => {
  const navigation = useNavigation()
  const [userData, setUserData] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const authUser = auth().currentUser.uid
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    async function fetchUserData() {
      const userCache = await redis.get(userId)
      console.log('user cache', userCache)
      if (userCache) {
        isMounted.current && setUserData(userCache)
        return
      }
      console.log('fetching firebase')
      firestore()
        .collection('Users')
        .doc(userId)
        .onSnapshot(
          async snapshot => {
            if (isMounted.current) {
              await redis.set(
                userId,
                JSON.stringify({...snapshot.data(), key: snapshot.id}),
              )
              setUserData({
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
      title: userData?.username,
    })
  }, [userData?.username])

  const handleButtonToggle = () => {
    setLoading(true)
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })

    promise.then(() => {
      setLoading(false)
      setIsConnected(!isConnected)
    })
  }

  const buttonStyle = isConnected
    ? {
        loadingText: 'Disconnecting...',
        text: 'Disconnect',
        color: COLORS.primary,
        activity: {
          color: COLORS.white2,
        },
      }
    : {
        loadingText: 'Connecting...',
        text: 'Connect',
        color: COLORS.white2,
        activity: {
          color: COLORS.primary,
        },
      }

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
            uri: userData?.profilePic,
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
              {userData?.followers?.length ?? 0}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Followers
            </Text>
          </View>
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {userData?.followings?.length ?? 0}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Following
            </Text>
          </View>
        </HStack>
      </HStack>

      <View my="2" mb="2">
        <Text fontSize="md" letterSpacing="lg" fontFamily="Lato-Regular">
          {userData?.username ?? ''}
        </Text>
        {userData?.bio && (
          <HStack alignItems="center">
            <Text fontSize="sm" color={COLORS.gray} fontFamily="Lato-Regular">
              {userData?.bio}
            </Text>
          </HStack>
        )}
        <Text
          mt="1"
          fontSize="sm"
          color={COLORS.gray}
          fontFamily="Lato-Regular">
          {userData?.email ?? ''}
        </Text>
      </View>

      <HStack alignItems="center" space="10">
        <StyledButton
          loader={loading}
          onPress={handleButtonToggle}
          icon={
            loading ? (
              <ActivityIndicator {...buttonStyle.activity} />
            ) : (
              <LightningIcon height="20" />
            )
          }
          textStyle={{
            fontSize: 15,
            fontFamily: 'Lato-Heavy',
            color: isConnected ? COLORS.white2 : COLORS.black,
          }}
          style={{padding: 12}}
          showRing={false}
          {...buttonStyle}
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
