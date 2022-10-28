import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import {Box, Flex, HStack, Text, View} from 'native-base'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
// import {Redis} from '@upstash/redis'
import FastImage from 'react-native-fast-image'

import {EditIcon, FilterIcon, GridIcon, ThreeDotsIcon, UserIcon} from '@/SVG'
import StyledButton from '@/components/Button'
import {RootStackParamList} from '@/Navigation/Root'
import {useSetRecoilState} from 'recoil'
import {IBottomSheetState} from '@/interface'
import {bottomSheetState} from '@/atoms/bottomSheetAtom'
import {COLORS, USERS_COLLECTION} from '@/constants'
// import {REDIS_REST_TOKEN, REDIS_REST_URL} from '@/../config'

// const redis = new Redis({
//   url: REDIS_REST_URL,
//   token: REDIS_REST_TOKEN,
// })

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

const DEFAULT_USER_DETAILS: IUserData = {
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

const ProfileHeader = ({userId, totalPosts = 0}: IProfileHeaderProps) => {
  const {navigate, setOptions} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [userData, setUserData] = useState<IUserData>(DEFAULT_USER_DETAILS)
  const authUser = auth().currentUser?.uid
  const setBottomSheetStateValue =
    useSetRecoilState<IBottomSheetState>(bottomSheetState)

  const handleModalState = useCallback(
    () =>
      setBottomSheetStateValue(() => ({
        type: 'profile',
        isOpen: true,
      })),
    [setBottomSheetStateValue],
  )

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleModalState}
          style={styles.threeDotsIconContainer}>
          <ThreeDotsIcon fill={COLORS.white} />
        </TouchableOpacity>
      ),
    })
  }, [handleModalState, setOptions])

  useEffect(() => {
    // updating header title to username
    setOptions({
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
    // const userCache = await redis.get(userId)
    // console.log('user cache', userCache)
    // if (userCache) {
    //   isMounted.current && setUserData(userCache)
    //   return
    // }
    const subscriber = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .onSnapshot(
        snapshot => {
          // await redis.set(
          //   userId,
          //   JSON.stringify({...snapshot.data(), key: snapshot.id}),
          // )
          setUserData(prev => ({
            ...prev,
            ...snapshot.data(),
            key: snapshot.id,
          }))
        },
        error => {
          console.log('user info fetching error', error)
        },
      )
    return subscriber
  }, [userId, userData.username, setOptions])

  useEffect(() => {
    setOptions({
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
  }, [userData.username, setOptions])

  return (
    <Box my="2" mb="5" paddingX="2">
      <HStack alignItems="center" justifyContent="space-between">
        <FastImage
          style={styles.profilePicContainer}
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
          <TouchableOpacity onPress={() => navigate('UpdateProfile')}>
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

const styles = StyleSheet.create({
  profilePicContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  threeDotsIconContainer: {
    transform: [{rotate: '90deg'}],
  },
})
