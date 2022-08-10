import {
  Box,
  Divider,
  Flex,
  HStack,
  PresenceTransition,
  Text,
  View,
} from 'native-base'
import React, {memo, useContext, useEffect, useState} from 'react'
import {ActivityIndicator, TouchableOpacity} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image'

import {useNavigation} from '@react-navigation/native'
import {COLORS} from '../../../constants'
import {UserDataContext} from '../../../Context/userData'
import {
  FilterIcon,
  GridIcon,
  LightningIcon,
  ThreeDotsIcon,
  UserIcon,
} from '../../../SVG'
import StyledButton from '../../Button'

const ProfileHeader = ({userId, totalPosts = 0}) => {
  let canSetState = true
  const navigation = useNavigation()
  const {contextUser} = useContext(UserDataContext)
  const [userData, setUserData] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const authUser = auth().currentUser.uid

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId === authUser) {
        canSetState && setUserData(contextUser)
      } else {
        const userInfo = await firestore()
          .collection('Users')
          .where('uid', '==', userId)
          .get()
        const latestUserData = {
          ...userInfo.docs[0].data(),
          key: userInfo.docs[0].id,
        }
        canSetState && setUserData(latestUserData)
      }
    }
    fetchUserDetails()

    return () => (canSetState = false)
  }, [userId])

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
    <Box my="2" mb="10">
      <HStack alignItems="center" justifyContent="space-between">
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}>
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
        </PresenceTransition>
        <HStack alignItems="center" space="8">
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {totalPosts}
            </Text>
            <Text color={COLORS.gray} fontFamily="Lato-Regular">
              Posts
            </Text>
          </View>
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {userData?.followers?.length}
            </Text>
            <Text color={COLORS.gray} fontFamily="Lato-Regular">
              Followers
            </Text>
          </View>
          <View>
            <Text fontSize="lg" fontFamily="Lato-Bold" textAlign="center">
              {userData?.followings?.length}
            </Text>
            <Text color={COLORS.gray} fontFamily="Lato-Regular">
              Following
            </Text>
          </View>
        </HStack>
      </HStack>

      <View my="5">
        <Text fontSize="lg" letterSpacing="lg" fontFamily="Lato-Regular">
          {userData?.username}
        </Text>
        <HStack alignItems="center">
          <Text fontSize="sm" color={COLORS.gray} fontFamily="Lato-Regular">
            Delhi, India
          </Text>
          <Divider thickness="2" h="3" mx="5" orientation="vertical" />
          <Text fontSize="sm" color={COLORS.gray} fontFamily="Lato-Regular">
            UX Designer - Apple
          </Text>
        </HStack>
        <Text
          mt="1"
          fontSize="sm"
          color={COLORS.gray}
          fontFamily="Lato-Regular">
          {userData?.email}
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
            <ThreeDotsIcon />
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
