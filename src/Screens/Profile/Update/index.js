import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import Button from '../../../components/Button';
import {GallaryIcon, CameraIcon} from '../../../SVG';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../../Context/auth';
import {UserDataContext} from '../../../Context/userData';
import Header from '../../../components/Header';
import {COLORS} from '../../../constants/theme';

const UpdateProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const {authUser} = useContext(AuthContext);
  const {updateUserData} = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  const disabled = !image;

  const handleChooseGallary = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        setImage(null);
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    ImagePicker.launchCamera({}, response => {
      if (response.didCancel) {
        setImage(null);
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleUploadImage = () => {
    setLoading(true);
    storage()
      .ref(authUser.uid)
      .putFile(image)
      .then(snapshot => {
        console.log('IMAGE UPLOADED', snapshot);
        const imageRef = storage().ref(authUser.uid);
        imageRef
          .getDownloadURL()
          .then(url => {
            console.log('UPLOADED IMAGE URL', url);
            updateUserData(url, navigation, setLoading);
          })
          .catch(err => {
            console.log('image download error', err);
          });
      })
      .catch(err => {
        console.log('IMAGE UPLOAD ERROR', err);
      });
  };

  return (
    <>
      <Header
        label="Update Profile"
        showBackButton
        onPress={handleUploadImage}
        rightSection
        disabled={disabled}
        loading={loading}
        navigation={navigation}
      />
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.profilePic}
            source={{
              uri: image
                ? image
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3eLpTAMWO-mtILepXLwg68-IChyGcXJgog&usqp=CAU',
            }}
          />
          <View style={styles.fullNameContainer}>
            <Text style={styles.textFullName}>Mohit Bisht</Text>
          </View>
          <Text style={styles.email}>bmohit980@gmail.com</Text>

          {/* <View style={styles.btnContainer}>
          <Button
          onPress={handleChooseGallary}
            style={styles.customBtn}
            text="Choose from gallary"
            />
          <Button
          onPress={handleTakePhoto}
          style={[styles.customBtn, {marginVertical: 0}]}
          color="grey"
          text="Take a picture"
          />
        </View> */}
        </View>

        <View>
          {/* <Button
          loader={loading}
          disabled={disabled}
          onPress={handleUploadImage}
          text="Update"
        /> */}
          <Button
            onPress={handleChooseGallary}
            style={styles.customBtn}
            text="Choose from gallary"
            color={COLORS.primary}
            icon={<GallaryIcon />}
          />
          <Button
            onPress={handleTakePhoto}
            style={[styles.customBtn, {marginVertical: 0}]}
            text="Take a picture"
            icon={<CameraIcon />}
          />
        </View>
      </View>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: COLORS.background,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 10,
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFullName: {
    color: '#E5E5E5',
    fontSize: 23,
    marginBottom: 5,
  },
  email: {
    fontSize: 15,
    color: '#747474',
  },
  btnContainer: {
    marginVertical: 20,
  },
  customBtn: {
    borderRadius: 50,
    marginVertical: 10,
  },
});
