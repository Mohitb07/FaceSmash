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
  GearIcon,
  LogoutIcon,
  PrivacyIcon,
  DocumentIcon,
} from '../../SVG';
import {
  Actionsheet,
  Text as NText,
  Box,
  useDisclose,
  Button,
} from 'native-base';
import {AuthContext} from '../../Context/auth';
import {BottomSheetContext} from '../../Context/BottomSheet';
import auth from '@react-native-firebase/auth';
import {UserDataContext} from '../../Context/userData';
import {COLORS} from '../../constants';

const MyProfile = ({navigation}) => {
  const {authUser} = useContext(AuthContext);
  const {userData} = useContext(UserDataContext);

  const {isOpen = false, onClose} = useContext(BottomSheetContext);
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
    <ScrollView>
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
            <Text style={styles.text}>26</Text>
            <Text style={(styles.text, {color: '#747474'})}>Close Friends</Text>
          </View>
        </View>
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>Inspiring Designers Globally 🌎</Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Update Profile')}
            style={styles.btnPost}>
            <Text style={styles.btnText}>Post</Text>
            <Text style={styles.btnBadge}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnPost, styles.btnVideo]}>
            <Text style={[styles.btnText, {color: '#171719'}]}>Videos</Text>
            <Text style={styles.btnBadge}>50</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.activityLabel}>Recent Activity</Text>
        <View>
          <Feed
            userProfilePic="https://i.imgur.com/QOLjDoo.jpeg"
            postTitle="Fortnite New Season is Here"
            image="https://cdn.vox-cdn.com/thumbor/Dut2NNiJhzjhcNIzF1tq3UMm6po=/0x0:1920x1080/1200x800/filters:focal(804x128:1110x434)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg"
          />
          <Feed
            userProfilePic="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            postTitle="Last of us Part II "
            image="https://www.denofgeek.com/wp-content/uploads/2020/06/The-Last-of-Us-Part-2-1.jpg?fit=1280%2C720"
          />
          <Feed
            userProfilePic="https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/9.JPG"
            postTitle="Without Image post"
          />
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
    backgroundColor: '#1D1F20',
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
    justifyContent: 'space-around',
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: '#F2F2F2',
    fontSize: 18,
    textAlign: 'center',
  },
  bioContainer: {
    marginTop: 20,
  },
  bio: {
    color: '#F2F2F2',
    fontSize: 15,
  },
  btnPost: {
    // backgroundColor: '#',
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
  btnVideo: {
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
});
