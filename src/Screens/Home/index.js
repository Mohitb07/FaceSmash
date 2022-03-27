import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feed from '../../components/Feed';
import {AuthContext} from '../../Context/auth';

import {SearchIcon} from '../../SVG';

const Home = ({navigation}) => {
  const {isLoggedIn, setLoginState} = useContext(AuthContext);
  const onLogoutAttempt = () => {
    setLoginState(false);
    navigation.navigate('Login');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.leftHeader}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{
                  uri: 'https://i.imgur.com/QOLjDoo.jpeg',
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.userInfo}>
                <Text style={styles.usernameText}>Sajon Islam</Text>
                <Text style={styles.email}>@sajon.co</Text>
              </View>
            </TouchableOpacity>
            {isLoggedIn && (
              <TouchableOpacity onPress={onLogoutAttempt}>
                <Text style={{color: 'white'}}>Log Out</Text>
              </TouchableOpacity>
            )}
            <View style={styles.rightHeader}>
              <TouchableOpacity style={styles.searchIcon}>
                <SearchIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.feedsContainer}>
            <Text style={styles.feedsLabel}>Trending</Text>
            <Feed
              userProfilePic="https://i.imgur.com/QOLjDoo.jpeg"
              postTitle="Fortnite New Season is Here"
              image="https://cdn.vox-cdn.com/thumbor/Dut2NNiJhzjhcNIzF1tq3UMm6po=/0x0:1920x1080/1200x800/filters:focal(804x128:1110x434)/cdn.vox-cdn.com/uploads/chorus_image/image/70383739/S8_KeyArt.0.jpg"
            />
            <Feed
              userProfilePic="http://thenewcode.com/assets/images/thumbnails/sarah-parmenter.jpeg"
              postTitle="Witcher 4 ?"
              image="https://www.pcgamesn.com/wp-content/uploads/legacy/Witcher_3_fps.jpg"
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
      </View>
    </ScrollView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    // backgroundColor: 'green',
    paddingVertical: 10,
  },
  headerContainer: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 25,
    marginRight: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeader: {
    backgroundColor: '#1F2124',
    borderRadius: 25,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  usernameText: {
    color: '#F2F2F2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  email: {
    color: '#747474',
    fontSize: 12,
  },
  feedsContainer: {
    // backgroundColor: 'red',
    flex: 1,
    paddingVertical: 20,
  },
  feedsLabel: {
    color: '#F2F2F2',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
