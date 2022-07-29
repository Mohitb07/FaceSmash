import {TouchableOpacity, StyleSheet, Pressable, Touchable} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  View,
  VStack,
} from 'native-base';

import {
  EditIcon,
  VerificationIcon,
  LightningIcon,
  ThreeDotsIcon,
  GridIcon,
  FilterIcon,
  UserIcon,
} from '../../../SVG';
import {COLORS} from '../../../constants';
import firestore from '@react-native-firebase/firestore';
import {AuthUserContext} from '../../../Context/auth';
import FastImage from 'react-native-fast-image';
import StyledButton from '../../Button';

const ProfileHeader = ({userId, navigation, totalPosts}) => {
  const {authUser} = useContext(AuthUserContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '==', userId)
      .get()
      .then(doc => {
        const profileData = [];
        doc.forEach(item => {
          profileData.push({
            ...item.data(),
            key: item.id,
          });
        });

        setUserData(profileData);
      });
  }, []);
  return (
    //    <View style={{paddingBottom: 20}}>
    //      <View style={styles.userInfo}>
    //        <Image
    //          size={110}
    //          alt="fallback text"
    //          borderRadius={100}
    //          source={{
    //            uri: userData[0]?.profilePic,
    //          }}
    //          fallbackSource={{
    //            uri: 'https://www.w3schools.com/css/img_lights.jpg',
    //          }}
    //          mb="3.5"
    //        />
    //        <HStack alignItems="center">
    //          <Text
    //            ellipsizeMode="middle"
    //            numberOfLines={1}
    //            style={styles.textFullName}>
    //            {userData[0]?.username}
    //          </Text>
    //          {/* { && <Icon as={VerificationIcon} ml="2" />} */}
    //          <Icon as={userData[0]?.username ? VerificationIcon : null} ml="2" />
    //        </HStack>
    //        <NText textAlign="center" color="gray.400">
    //          {userData[0]?.email}
    //        </NText>
    //        <Button
    //          mt="7"
    //          backgroundColor={COLORS.primary}
    //          isLoading={false}
    //          borderRadius="full"
    //          width="1/2">
    //          <NText fontFamily="Lato-Heavy" color={COLORS.white2}>
    //            Follow
    //          </NText>
    //        </Button>
    //      </View>
    //      <View style={styles.connections}>
    //        <View>
    //          <Text style={styles.text}>{userData[0]?.followings?.length}</Text>
    //          <Text style={(styles.text, {color: '#747474'})}>Following</Text>
    //        </View>
    //        <View>
    //          <Text style={styles.text}>{userData[0]?.followers?.length}</Text>
    //          <Text style={(styles.text, {color: '#747474'})}>Followers</Text>
    //        </View>
    //        <View>
    //          <Text style={styles.text}>{totalPosts}</Text>
    //          <Text style={(styles.text, {color: '#747474'})}>Posts</Text>
    //        </View>
    //      </View>
    //      {/* <View style={styles.bioContainer}>
    //          <Text style={styles.bio}>Inspiring Designers Globally 🌎</Text>
    //        </View> */}
    //
    //      <Box style={styles.btnContainer}>
    //        <TouchableOpacity style={styles.btnPost}>
    //          <Text style={styles.btnText}>Post</Text>
    //          <Text style={styles.btnBadge}>{totalPosts}</Text>
    //        </TouchableOpacity>
    //        {authUser?.uid === userId && (
    //          <TouchableOpacity
    //            style={[styles.btnPost, styles.btnBackground]}
    //            onPress={() => navigation.navigate('Update Profile')}>
    //            <EditIcon />
    //            <Text style={[styles.btnText, {color: COLORS.white2}]}>
    //              Edit Profile
    //            </Text>
    //          </TouchableOpacity>
    //        )}
    //      </Box>
    //      <Text style={styles.activityLabel}>Recent Activity</Text>
    //    </View>
    <Box my="10" mt="7">
      <HStack alignItems="center" justifyContent="space-between">
        <FastImage
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
          }}
          source={{
            uri: userData[0]?.profilePic,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <VStack space="3">
          <HStack alignItems="center" space="10">
            <View>
              <Text fontSize="md" fontFamily="Lato-Bold" textAlign="center">
                {totalPosts}
              </Text>
              <Text color={COLORS.gray} fontFamily="Lato-Regular">
                Posts
              </Text>
            </View>
            <View>
              <Text fontSize="md" fontFamily="Lato-Bold" textAlign="center">
                {userData[0]?.followers?.length}
              </Text>
              <Text color={COLORS.gray} fontFamily="Lato-Regular">
                Followers
              </Text>
            </View>
            <View>
              <Text fontSize="md" fontFamily="Lato-Bold" textAlign="center">
                {userData[0]?.followings?.length}
              </Text>
              <Text color={COLORS.gray} fontFamily="Lato-Regular">
                Following
              </Text>
            </View>
          </HStack>
          <Center>
            <HStack space="10">
              <Pressable>
                <Text
                  fontSize="md"
                  color={COLORS.primary}
                  fontFamily="Lato-Heavy">
                  Follow
                </Text>
              </Pressable>
              <Pressable>
                <Text
                  fontSize="md"
                  color={COLORS.primary}
                  fontFamily="Lato-Heavy">
                  Message
                </Text>
              </Pressable>
            </HStack>
          </Center>
        </VStack>
      </HStack>

      <View my="5">
        <Text fontSize="2xl" fontFamily="Lato-Regular">
          {userData[0]?.username}
        </Text>
        <HStack alignItems="center">
          <Text fontSize="md" color={COLORS.gray} fontFamily="Lato-Regular">
            Delhi, India
          </Text>
          <Divider thickness="2" h="4" mx="5" orientation="vertical" />
          <Text fontSize="md" color={COLORS.gray} fontFamily="Lato-Regular">
            UX Designer - Apple
          </Text>
        </HStack>
        <Text
          mt="1"
          fontSize="md"
          color={COLORS.gray}
          fontFamily="Lato-Regular">
          {userData[0]?.email}
        </Text>
      </View>

      <HStack alignItems="center" space="10">
        <StyledButton
          icon={<LightningIcon height="25" />}
          text="Connect"
          color={COLORS.white2}
          textStyle={{fontSize: 15, fontFamily: 'Lato-Heavy'}}
          style={{padding: 12}}
        />
        {authUser?.uid === userId && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Update Profile')}>
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
            <Text ml="3" fontSize="md" fontFamily="Lato-Semibold">
              Activity
            </Text>
          </Flex>
          <Flex direction="row" align="center">
            <UserIcon height="23" width="23" />
            <Text
              color={COLORS.gray}
              ml="3"
              fontSize="md"
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
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textFullName: {
    color: '#E5E5E5',
    fontSize: 23,
    marginBottom: 5,
    fontFamily: 'Lato-Semibold',
    letterSpacing: 1,
  },
  userInfo: {
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    fontSize: 15,
    color: '#747474',
  },
  connections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
  },
  text: {
    color: '#F2F2F2',
    fontSize: 18,
    textAlign: 'center',
  },
  bioContainer: {
    marginTop: 20,
    padding: 5,
  },
  bio: {
    color: '#F2F2F2',
    fontSize: 15,
  },
  btnPost: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    borderColor: '#171719',
    borderWidth: 5,
    alignItems: 'center',
  },
  btnBackground: {
    backgroundColor: COLORS.primary,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnBadge: {
    backgroundColor: COLORS.background,
    color: COLORS.primary,
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 15,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  activityLabel: {
    color: '#F2F2F2',
    fontSize: 25,
    marginTop: 20,
    fontFamily: 'Lato-Heavy',
    color: 'white',
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    backgroundColor: 'none',
  },
  editProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loading: {
    marginVertical: 10,
  },
});
