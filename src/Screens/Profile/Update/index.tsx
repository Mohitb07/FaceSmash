import {HStack} from 'native-base'
import React, {useContext, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {View as NView} from 'native-base'
import Button from '../../../components/Button'
import {CheckIcon, CloseIcon} from '../../../SVG'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'react-native-image-picker'
import Header from '../../../components/Header'
import {COLORS} from '../../../constants/theme'
import {AuthUserContext} from '../../../Context/auth'
import {UserDataContext} from '../../../Context/userData'
import {RootStackParamList} from '../../../Navigation/Root'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import Label from '../../../components/Label'
import StyledTextInput from '../../../components/TextInput'

type UpdateProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>

const UpdateProfile = ({navigation}: UpdateProfileScreenNavigationProp) => {
  const [image, setImage] = useState<string>('')
  const {user} = useContext(AuthUserContext)
  const [userBio, setUserBio] = useState<string>('')
  const {contextUser, updateUserData} = useContext(UserDataContext)
  const [loading, setLoading] = useState(false)

  const disabled = !(!!image || !!userBio)

  console.log('context User ', contextUser)

  console.log('image', !!image)
  console.log('userBio', !!userBio)

  const handleChooseGallary = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return
      } else if (response.errorCode) {
        console.log('Image picker error', response.errorMessage)
      } else {
        if (response.assets) {
          const value = response.assets[0].uri
          setImage(value!)
        }
      }
    })
  }

  const handleTakePhoto = () => {
    ImagePicker.launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        return
      } else if (response.errorCode) {
        console.log('Image picker error', response.errorMessage)
      } else {
        if (response.assets) {
          const value = response.assets[0].uri
          setImage(value!)
        }
      }
    })
  }

  const handleUploadImage = async () => {
    setLoading(true)
    if (userBio) {
      const filterdUserBio = userBio.trim()
      firestore()
        .collection('Users')
        .doc(user.uid)
        .set(
          {
            bio: filterdUserBio,
          },
          {merge: true},
        )
        .then(() => {
          console.log('bio updated')
          !Boolean(image) && navigation.goBack()
        })
    }
    if (image) {
      console.log('inside image')
      storage()
        .ref(`${contextUser?.uid}/profilePic/`)
        .putFile(image)
        .then(snapshot => {
          console.log('IMAGE UPLOADED', snapshot)
          const imageRef = storage().ref(`${contextUser?.uid}/profilePic/`)
          imageRef
            .getDownloadURL()
            .then(url => {
              console.log('UPLOADED IMAGE URL', url)
              updateUserData(url, navigation, setLoading, user.uid)
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
            onPress={handleChooseGallary}
            color={COLORS.white2}
            showRing={false}
            textStyle={{fontFamily: 'Lato-Heavy'}}
            disabled={loading}
          />
          <Button
            text="Take Now"
            onPress={handleTakePhoto}
            color={COLORS.primary}
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
  userInfo: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    color: COLORS.white2,
  },
})
