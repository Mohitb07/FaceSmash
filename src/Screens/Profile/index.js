import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Feed from '../../components/Feed';
import {
  VerificationIcon,
  LogoutIcon,
  PrivacyIcon,
  DocumentIcon,
  GearIcon,
  EditIcon,
} from '../../SVG';
import {Actionsheet, Text as NText, Box, useDisclose} from 'native-base';
import {AuthContext} from '../../Context/auth';
import auth from '@react-native-firebase/auth';
import {UserDataContext} from '../../Context/userData';
import {COLORS} from '../../constants';
import Header from '../../components/Header';
import fakeData from '../../assets/fakeData.json';

const MyProfile = ({navigation}) => {
  const {authUser} = useContext(AuthContext);
  const {userData} = useContext(UserDataContext);
  const {isOpen, onOpen, onClose} = useDisclose();

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => {
        setAuthenticatedUser(null);
        console.log('Signed Out');
        navigation.navigate('Login');
      })
      .catch(err => console.log('SIGN OUT ERROR', err));
  };
  return (
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <Header
        showBackButton={true}
        navigation={navigation}
        key="profile"
        rightSection
        rightIcon={<GearIcon />}
        onPress={onOpen}
        bgColor="#1D1F20"
      />
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.profilePic}
            source={{
              uri: userData?.profilePic,
            }}
          />
          <View style={styles.fullNameContainer}>
            <Text style={styles.textFullName}>{userData?.username}</Text>
            <VerificationIcon style={{marginLeft: 5}} />
          </View>
          <Text style={styles.email}>{userData?.email}</Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Update Profile')}
            style={[styles.btnPost, styles.btnBackground, {width: '40%'}]}>
            <Text style={[styles.btnText, {color: '#171719'}]}>Follow</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.connections}>
          <View>
            <Text style={styles.text}>{userData?.followings.length}</Text>
            <Text style={(styles.text, {color: '#747474'})}>Following</Text>
          </View>
          <View>
            <Text style={styles.text}>{userData?.followers.length}</Text>
            <Text style={(styles.text, {color: '#747474'})}>Followers</Text>
          </View>
          <View>
            <Text style={styles.text}>0</Text>
            <Text style={(styles.text, {color: '#747474'})}>Posts</Text>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>Inspiring Designers Globally 🌎</Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnPost}>
            <Text style={styles.btnText}>Post</Text>
            <Text style={styles.btnBadge}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnPost, styles.btnBackground]}
            onPress={() => navigation.navigate('Update Profile')}>
            <EditIcon />
            <Text style={[styles.btnText, {color: '#171719'}]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.activityLabel}>Recent Activity</Text>
        <View>
          {fakeData.posts.map(post => (
            <Feed
              key={post.uid}
              userProfilePic={post.userProfile}
              username={post.username}
              postTitle={post.title}
              image={post.image}
              navigation={navigation}
            />
          ))}
        </View>
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <NText
              fontSize="20"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}>
              Personal Settings
            </NText>
          </Box>
          <Actionsheet.Item style={styles.defaultStyle}>
            <TouchableOpacity style={styles.btnLogout}>
              <DocumentIcon style={{marginRight: 5}} />
              <Text style={{color: 'white', fontWeight: '600'}}>
                Settings and Privacy
              </Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item style={styles.defaultStyle}>
            <TouchableOpacity style={styles.btnLogout}>
              <PrivacyIcon style={{marginRight: 5}} />
              <Text style={{color: 'white', fontWeight: '600'}}>
                Settings and Privacy
              </Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          {!!authUser && (
            <Actionsheet.Item style={styles.defaultStyle}>
              <TouchableOpacity
                style={styles.btnLogout}
                onPress={onLogoutAttempt}>
                <LogoutIcon style={{marginRight: 5}} />
                <Text style={{color: 'red', fontWeight: '600'}}>Log Out</Text>
              </TouchableOpacity>
            </Actionsheet.Item>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
    paddingHorizontal: 20,
  },
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
  },
  activityLabel: {
    color: '#F2F2F2',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
