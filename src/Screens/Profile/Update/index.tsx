import React, {useState} from 'react'
import {Image, StyleSheet, Text, View, TextInput} from 'react-native'

import {HStack, View as NView} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Button from '@/components/Button'
import {CheckIcon, CloseIcon} from '@/SVG'
import Header from '@/components/Header'
import Label from '@/components/Label'
import {COLORS, FONTS} from '@/constants/theme'
import {RootStackParamList} from '@/Navigation/Root'
import useSelectImage from '@/hooks/useSelectImage'
import useUserData from '@/hooks/useUserData'
import useAuthUser from '@/hooks/useAuthUser'

type UpdateProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>

const UpdateProfile: React.FC<UpdateProfileScreenNavigationProp> = ({
  navigation,
}) => {
  const [userBio, setUserBio] = useState('')
  const [loading, setLoading] = useState(false)
  const {user} = useAuthUser()
  const {contextUser, updateUserData} = useUserData()
  const {handleChooseGallary, handleTakePhoto, selectedImage} = useSelectImage()
  const USER_PROFILE_PIC_REFERENCE = `${contextUser?.uid}/profilePic/`

  const disabled = !(!!selectedImage || !!userBio)

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
            .then(async url => {
              await updateUserData(url, contextUser?.uid!)
              navigation.navigate('Profile', {
                providedUserId: contextUser?.uid!,
              })
            })
            .catch(err => {
              console.log('image download error', err)
            })
        })
        .catch(err => {
          console.log('IMAGE UPLOAD ERROR', err)
        })
        .finally(() => {
          setLoading(false)
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
            <Label label="Bio" />
            <TextInput
              value={userBio || contextUser?.bio}
              placeholder="Your bio here..."
              placeholderTextColor={COLORS.lightGray2}
              onChangeText={setUserBio}
              maxLength={30}
              style={styles.textInput}
            />
          </NView>
        </View>
        <HStack space="10">
          <Button
            text="Open Gallary"
            onPress={() => handleChooseGallary({navigate: false})}
            bgColor={COLORS.white2}
            showRing={false}
            disabled={loading}
            style={styles.btnContainer}
          />
          <Button
            text="Take Now"
            onPress={handleTakePhoto}
            bgColor={COLORS.primary}
            showRing={false}
            textStyle={styles.customBtnText}
            disabled={loading}
            style={styles.btnContainer}
          />
        </HStack>
      </View>
    </>
  )
}

export default React.memo(UpdateProfile)

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
    ...FONTS.h2,
    marginBottom: 5,
  },
  email: {
    ...FONTS.h4,
    color: '#747474',
  },
  customBtnText: {
    color: COLORS.white2,
  },
  textInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: COLORS.white,
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
  btnContainer: {
    paddingVertical: 14,
  },
})
