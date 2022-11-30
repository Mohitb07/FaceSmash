import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import {Box, Flex, HStack, Text, View} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Redis} from '@upstash/redis'
import FastImage from 'react-native-fast-image'

import {FilterIcon, GridIcon, ThreeDotsIcon} from '@/SVG'
import {RootStackParamList} from '@/Navigation/Root'
import {useSetRecoilState} from 'recoil'
import {IBottomSheetState} from '@/interface'
import {bottomSheetState} from '@/atoms/bottomSheetAtom'
import {COLORS, USERS_COLLECTION} from '@/constants'
import {IUserDetail} from '@/interface'
import Connection from '@/components/Connection'
import {REDIS_REST_TOKEN, REDIS_REST_URL} from '@/../config'
import {useConnections} from '@/hooks/useConnections'

const redis = new Redis({
  url: REDIS_REST_URL,
  token: REDIS_REST_TOKEN,
})

interface IProfileHeaderProps {
  userId: string
  totalPosts: number
}

const DEFAULT_USER_DETAILS: IUserDetail = {
  bio: '',
  createdAt: '',
  email: '',
  lastSignIn: '',
  profilePic: '',
  qusername: '',
  uid: '',
  username: '',
}

const ProfileHeader = ({userId, totalPosts = 0}: IProfileHeaderProps) => {
  const {navigate, setOptions} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [userData, setUserData] = useState<IUserDetail>(DEFAULT_USER_DETAILS)
  const {connectionsCount, followersList, loading} = useConnections({
    userId,
  })
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
    const fetchRedis = async () => {
      const userCache: IUserDetail | null = await redis.get(userId)
      console.log('user cache', userCache)
      if (userCache) {
        setUserData(userCache)
        return
      }
    }
    fetchRedis()
    const subscriber = firestore()
      .collection(USERS_COLLECTION)
      .doc(userId)
      .onSnapshot(
        async snapshot => {
          await redis.set(
            userId,
            JSON.stringify({...snapshot.data(), key: snapshot.id}),
          )
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
          <View alignItems="center">
            <Text fontSize="lg" fontFamily="Lato-Bold">
              {totalPosts}
            </Text>
            <Text color={COLORS.white2} fontFamily="Lato-Regular">
              Posts
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigate('Followers', {
                uid: userData.uid,
                followersList: followersList,
              })
            }>
            <View alignItems="center">
              <Text fontSize="lg" fontFamily="Lato-Bold">
                {!loading ? connectionsCount.followers : 0}
              </Text>
              <Text color={COLORS.white2} fontFamily="Lato-Regular">
                Followers
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigate('Followings', {
                uid: userData.uid,
              })
            }>
            <View alignItems="center">
              <Text fontSize="lg" fontFamily="Lato-Bold">
                {!loading ? connectionsCount.followings : 0}
              </Text>
              <Text color={COLORS.white2} fontFamily="Lato-Regular">
                Following
              </Text>
            </View>
          </TouchableOpacity>
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
      <Connection userId={userId} userFollowersList={followersList} />
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
