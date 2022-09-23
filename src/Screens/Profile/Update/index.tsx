import React, {useContext, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {HStack, View as NView} from 'native-base'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import * as ImagePicker from 'react-native-image-picker'

import Button from '../../../components/Button'
import {CheckIcon, CloseIcon} from '../../../SVG'
import Header from '../../../components/Header'
import Label from '../../../components/Label'
import StyledTextInput from '../../../components/TextInput'
import {COLORS} from '../../../constants/theme'
import {AuthUserContext} from '../../../Context/auth'
import {UserDataContext} from '../../../Context/userData'
import {RootStackParamList} from '../../../Navigation/Root'
import useSelectImage from '../../../hooks/useSelectImage'

type UpdateProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>

const UpdateProfile = ({navigation}: UpdateProfileScreenNavigationProp) => {
  // const [image, setImage] = useState<string>('')
  const [userBio, setUserBio] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const {user} = useContext(AuthUserContext)
  const {contextUser, updateUserData} = useContext(UserDataContext)
  const {handleChooseGallary, handleTakePhoto, selectedImage} = useSelectImage()
  const USER_PROFILE_PIC_REFERENCE = `${contextUser?.uid}/profilePic/`

  const disabled = !(!!selectedImage || !!userBio)

  // const handleChooseGallary = () => {
  //   ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
  //     if (response.didCancel) {
  //       return
  //     } else if (response.errorCode) {
  //       console.log('Image picker error', response.errorMessage)
  //     } else {
  //       if (response.assets) {
  //         const value = response.assets[0].uri
  //         setImage(value!)
  //       }
  //     }
  //   })
  // }

  // const handleTakePhoto = () => {
  //   ImagePicker.launchCamera({mediaType: 'photo'}, response => {
  //     if (response.didCancel) {
  //       return
  //     } else if (response.errorCode) {
  //       console.log('Image picker error', response.errorMessage)
  //     } else {
  //       if (response.assets) {
  //         const value = response.assets[0].uri
  //         setImage(value!)
  //       }
  //     }
  //   })
  // }

  const handleUploadImage = async () => {
    setLoading(true)
    const filterdUserBio = userBio.trim()
    if (filterdUserBio) {
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set(
          {
            bio: filterdUserBio,
          },
          {merge: true}, // so that it don't overwrite the existing document data
        )
        .then(() => {
          console.log('bio updated')
          !Boolean(selectedImage) && navigation.goBack()
        })
    }
    if (selectedImage) {
      storage()
        .ref(USER_PROFILE_PIC_REFERENCE)
        .putFile(selectedImage)
        .then(snapshot => {
          storage()
            .ref(USER_PROFILE_PIC_REFERENCE)
            .getDownloadURL()
            .then(url => {
              updateUserData(url, navigation, setLoading, contextUser?.uid!)
            })
            .catch(err => {
              console.log('image download error', err)
            })
        })
        .catch(err => {
          console.log('IMAGE UPLOAD ERROR', err)
        })
    }
  }

  return (
    <>
      <Header
        label="Update Profile"
        onPress={handleUploadImage}
        hasRightSection
        isDisabled={disabled}
        isLoading={loading}
        navigate={() => navigation.goBack()}
        leftIcon={<CloseIcon />}
        rightIcon={<CheckIcon />}
      />

      <View style={styles.container}>
        <View>
          <Image
            style={styles.profilePic}
            source={{
              uri: selectedImage ? selectedImage : contextUser?.profilePic,
            }}
          />
          <View style={styles.fullNameContainer}>
            <Text style={styles.textFullName}>{contextUser?.username}</Text>
          </View>
          <Text style={styles.email}>{contextUser?.email}</Text>
          <NView mb="5">
            <Label label="Bio" labelStyle={{fontSize: 15}} />
            <StyledTextInput
              value={userBio || contextUser?.bio}
              placeholder="Your bio here..."
              onChangeText={text => setUserBio(text)}
              maxLength={30}
            />
          </NView>
        </View>
        <HStack space="10">
          <Button
            text="Open Gallary"
            onPress={() => handleChooseGallary({navigate: false})}
            bgColor={COLORS.white2}
            showRing={false}
            textStyle={{fontFamily: 'Lato-Heavy'}}
            disabled={loading}
          />
          <Button
            text="Take Now"
            onPress={handleTakePhoto}
            bgColor={COLORS.primary}
            showRing={false}
            textStyle={{
              fontFamily: 'Lato-Heavy',
              color: COLORS.white2,
            }}
            disabled={loading}
          />
        </HStack>
      </View>
    </>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 15,
    backgroundColor: COLORS.mainBackground,
  },
  profilePic: {
    width: 100,
    height: 100,
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
    color: COLORS.white2,
  },
})
