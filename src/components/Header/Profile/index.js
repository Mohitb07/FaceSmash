import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, HStack, Icon, Image, Text as NText} from 'native-base';
import {EditIcon, VerificationIcon} from '../../../SVG';
import {COLORS} from '../../../constants';
import firestore from '@react-native-firebase/firestore';
import {AuthUserContext} from '../../../Context/auth';

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
    <View style={{paddingBottom: 20}}>
      <View style={styles.userInfo}>
        <Image
          size={110}
          alt="fallback text"
          borderRadius={100}
          source={{
            uri: userData[0]?.profilePic,
          }}
          fallbackSource={{
            uri: 'https://www.w3schools.com/css/img_lights.jpg',
          }}
          mb="3.5"
        />
        <HStack alignItems="center">
          <Text
            ellipsizeMode="middle"
            numberOfLines={1}
            style={styles.textFullName}>
            {userData[0]?.username}
          </Text>
          {/* { && <Icon as={VerificationIcon} ml="2" />} */}
          <Icon as={userData[0]?.username ? VerificationIcon : null} ml="2" />
        </HStack>
        <NText textAlign="center" color="gray.400">
          {userData[0]?.email}
        </NText>
        <Button
          mt="7"
          backgroundColor={COLORS.neon}
          isLoading={false}
          borderRadius="full"
          width="1/2">
          <NText fontFamily="Lato-Heavy" color={COLORS.transparentBlack7}>
            Follow
          </NText>
        </Button>
      </View>
      <View style={styles.connections}>
        <View>
          <Text style={styles.text}>{userData[0]?.followings?.length}</Text>
          <Text style={(styles.text, {color: '#747474'})}>Following</Text>
        </View>
        <View>
          <Text style={styles.text}>{userData[0]?.followers?.length}</Text>
          <Text style={(styles.text, {color: '#747474'})}>Followers</Text>
        </View>
        <View>
          <Text style={styles.text}>{totalPosts}</Text>
          <Text style={(styles.text, {color: '#747474'})}>Posts</Text>
        </View>
      </View>
      {/* <View style={styles.bioContainer}>
          <Text style={styles.bio}>Inspiring Designers Globally 🌎</Text>
        </View> */}

      <Box style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnPost}>
          <Text style={styles.btnText}>Post</Text>
          <Text style={styles.btnBadge}>{totalPosts}</Text>
        </TouchableOpacity>
        {authUser?.uid === userId && (
          <TouchableOpacity
            style={[styles.btnPost, styles.btnBackground]}
            onPress={() => navigation.navigate('Update Profile')}>
            <EditIcon />
            <Text style={[styles.btnText, {color: COLORS.transparentBlack7}]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
      </Box>
      <Text style={styles.activityLabel}>Recent Activity</Text>
    </View>
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
    backgroundColor: COLORS.neon,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnBadge: {
    backgroundColor: COLORS.background,
    color: COLORS.neon,
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
