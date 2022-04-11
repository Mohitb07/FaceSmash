import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const MyProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.profilePic}
          source={{uri: 'https://i.imgur.com/QOLjDoo.jpeg'}}
        />
        <Text style={styles.textFullName}>Sajon Islam 🎯</Text>
        <Text style={styles.email}>@sajon.co</Text>
      </View>
      <View style={styles.connections}>
        <View>
          <Text style={styles.text}>204</Text>
          <Text style={(styles.text, {color: '#747474'})}>Following</Text>
        </View>
        <View>
          <Text style={styles.text}>2.5M</Text>
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
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
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
  },
  bioContainer: {
    marginTop: 20,
  },
  bio: {
    color: '#F2F2F2',
    fontSize: 15,
  },
});
