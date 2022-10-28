import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import {Avatar, HStack, View as NView} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Button from '@/components/Button'
import {CheckIcon, CloseIcon} from '@/SVG'
import Label from '@/components/Label'
import {COLORS, FONTS} from '@/constants/theme'
import {RootStackParamList} from '@/Navigation/Root'
import useSelectImage from '@/hooks/useSelectImage'
import useUserData from '@/hooks/useUserData'
import useUploadImage from '@/hooks/useUploadImage'
import {USERS_COLLECTION} from '@/constants'

type UpdateProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UpdateProfile'
>

const UpdateProfile: React.FC<UpdateProfileScreenNavigationProp> = ({
  navigation: {goBack, setOptions},
}) => {
  const [userBio, setUserBio] = useState('')
  const [loading, setLoading] = useState(false)
  const {contextUser, updateUserData} = useUserData()
  const {firestoreImageUpload} = useUploadImage()
  const {handleChooseGallary, handleTakePhoto, selectedImage} = useSelectImage()
  const USER_PROFILE_PIC_REFERENCE = `${contextUser?.uid}/profilePic/`

  const disabled = !(!!selectedImage || !!userBio)

  const handleUploadImage = async () => {
    setLoading(true)
    const filterdUserBio = userBio.trim()
    if (filterdUserBio) {
      const userDocRef = firestore()
        .collection(USERS_COLLECTION)
        .doc(contextUser?.uid)
      await userDocRef.set(
        {
          bio: filterdUserBio,
        },
        {merge: true}, // so that it don't overwrite the existing document data
      )
      !selectedImage && goBack()
    }
    if (selectedImage) {
      try {
        const url = await firestoreImageUpload(
          USER_PROFILE_PIC_REFERENCE,
          selectedImage,
        )
        updateUserData(url, contextUser?.uid!)
        goBack()
      } catch (err) {
        console.log('Error', err)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity disabled={loading} onPress={goBack}>
          <CloseIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity disabled={disabled} onPress={handleUploadImage}>
          {loading ? (
            <ActivityIndicator color={COLORS.secondary} />
          ) : (
            <CheckIcon />
          )}
        </TouchableOpacity>
      ),
    })
  })

  return (
    <>
      <View style={styles.container}>
        <View>
          <Avatar
            style={styles.profilePic}
            source={{
              uri: selectedImage ? selectedImage : contextUser?.profilePic,
            }}
            size="2xl"
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
            onPress={handleChooseGallary}
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
