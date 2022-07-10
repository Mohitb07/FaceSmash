import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useContext} from 'react';
import Button from '../../../components/Button';
import {GallaryIcon, CameraIcon, CloseIcon, CheckIcon} from '../../../SVG';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {AuthContext, AuthUserContext} from '../../../Context/auth';
import {UserDataContext} from '../../../Context/userData';
import Header from '../../../components/Header';
import {COLORS, FONTS} from '../../../constants/theme';
import {authState} from '../../../atoms/authAtom';
import {useRecoilValue} from 'recoil';

const UpdateProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const {authUser} = useContext(AuthUserContext);
  const {contextUser, updateUserData} = useContext(UserDataContext);
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
      .ref(authUser?.uid)
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
        leftIcon={<CloseIcon />}
        rightIcon={<CheckIcon />}
      />
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.profilePic}
            source={{
              uri: image ? image : contextUser?.profilePic,
            }}
          />
          <View style={styles.fullNameContainer}>
            <Text style={styles.textFullName}>{contextUser?.username}</Text>
          </View>
          <Text style={styles.email}>{contextUser?.email}</Text>
        </View>

        <View style={styles.btnContainer}>
          <Button
            onPress={handleChooseGallary}
            style={styles.customBtn}
            text="Open Gallary"
            color={COLORS.primary}
            textStyle={[styles.customBtnText, {color: 'white'}]}
            icon={<GallaryIcon />}
          />
          <Button
            onPress={handleTakePhoto}
            style={[styles.customBtn]}
            color={COLORS.neon}
            text="Take Now"
            textStyle={styles.customBtnText}
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
    backgroundColor: COLORS.mainBackground,
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
    // marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  customBtn: {
    borderRadius: 50,
    marginVertical: 15,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  customBtnText: {
    fontSize: 12,
  },
});
