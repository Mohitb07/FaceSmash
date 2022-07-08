import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
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
// import {AuthContext} from '../../Context/auth';
import auth from '@react-native-firebase/auth';
import {UserDataContext} from '../../Context/userData';
import {COLORS} from '../../constants';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import {authState} from '../../atoms/authAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import usePosts from '../../hooks/usePosts';
import {postState} from '../../atoms/postAtom';
import FastImage from 'react-native-fast-image';

const MyProfile = ({route, navigation}) => {
  const {providedUserId} = route?.params || null;
  const [onPostLike] = usePosts();
  const authUser = useRecoilValue(authState);
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const {contextUser} = useContext(UserDataContext);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [myRecentPosts, setMyRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [userProfileLoading, setUserProfileLoading] = useState(true);

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => console.log('logged out'))
      .catch(err => console.log('SIGN OUT ERROR', err));
  };

  useEffect(() => {
    console.log('calling post effect 😢❤️❤️❤️🟢');
    firestore()
      .collection('Posts')
      .where('user', '==', providedUserId)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const allRecentPosts = [];
        querySnapshot.forEach(doc => {
          allRecentPosts.push({
            ...doc.data(),
            key: doc.id,
          });
        });

        setMyRecentPosts(allRecentPosts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '==', providedUserId)
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
        setUserProfileLoading(false);
      });
  }, []);

  return (
    <>
      <Header
        showBackButton={true}
        navigation={navigation}
        key="profile"
        label={userData[0]?.username}
        rightSection
        rightIcon={<GearIcon />}
        onPress={onOpen}
      />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={myRecentPosts}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontSize: 20,
                  marginTop: 40,
                }}>
                No Enough Data
              </Text>
            )
          }
          keyExtractor={item => item.key}
          ListHeaderComponent={() => (
            <View style={{paddingBottom: 20}}>
              <View style={styles.userInfo}>
                {userProfileLoading ? (
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri: 'https://media.istockphoto.com/photos/texture-black-total-background-abstract-new-asphalt-stucco-concrete-picture-id1251205352?k=20&m=1251205352&s=612x612&w=0&h=0plv7YbuwV3fv2KGxdppirlJ5CXaenLMaEmxikfVPsU=',
                    }}
                  />
                ) : (
                  // <Image
                  //   style={styles.profilePic}
                  //   source={{
                  //     uri: userData[0]?.profilePic,
                  //   }}
                  // />
                  <FastImage
                    style={styles.profilePic}
                    source={{
                      uri: userData[0]?.profilePic,
                      // headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                )}
                <View style={styles.fullNameContainer}>
                  <Text style={styles.textFullName}>
                    {userData[0]?.username}
                  </Text>
                  {userData[0]?.username && (
                    <VerificationIcon style={{marginLeft: 5}} />
                  )}
                </View>
                <Text style={styles.email}>{userData[0]?.email}</Text>
                <TouchableOpacity
                  style={[
                    styles.btnPost,
                    styles.btnBackground,
                    {width: '40%'},
                  ]}>
                  <Text
                    style={[styles.btnText, {color: COLORS.transparentBlack7}]}>
                    Follow
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.connections}>
                <View>
                  <Text style={styles.text}>
                    {userData[0]?.followings?.length}
                  </Text>
                  <Text style={(styles.text, {color: '#747474'})}>
                    Following
                  </Text>
                </View>
                <View>
                  <Text style={styles.text}>
                    {userData[0]?.followers?.length}
                  </Text>
                  <Text style={(styles.text, {color: '#747474'})}>
                    Followers
                  </Text>
                </View>
                <View>
                  <Text style={styles.text}>{myRecentPosts?.length}</Text>
                  <Text style={(styles.text, {color: '#747474'})}>Posts</Text>
                </View>
              </View>
              {/* <View style={styles.bioContainer}>
                <Text style={styles.bio}>Inspiring Designers Globally 🌎</Text>
              </View> */}

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnPost}>
                  <Text style={styles.btnText}>Post</Text>
                  <Text style={styles.btnBadge}>{myRecentPosts?.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnPost, styles.btnBackground]}
                  onPress={() => navigation.navigate('Update Profile')}>
                  <EditIcon />
                  <Text
                    style={[styles.btnText, {color: COLORS.transparentBlack7}]}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.activityLabel}>Recent Activity</Text>
            </View>
          )}
          renderItem={({item}) => (
            <Feed
              postId={item.key}
              userProfilePic={item?.userProfile}
              createdAt={item.createdAt}
              username={item.username}
              postTitle={item.title}
              image={item.image}
              description={item.description}
              navigation={navigation}
              likes={
                postStateValue.posts.find(post => post.key === item.key)?.likes
              }
              userId={item.user}
              onLike={onPostLike}
            />
          )}
        />
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
      </View>
    </>
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
  loading: {
    marginVertical: 10,
  },
});
