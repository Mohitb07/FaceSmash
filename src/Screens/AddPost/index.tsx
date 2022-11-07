import React, {useState, useEffect} from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import {Avatar, Center, ChevronUpIcon, Text, View, VStack} from 'native-base'
import Toast from 'react-native-toast-message'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import Label from '@/components/Label'
import {COLORS, FONTS, POSTS_COLLECTION} from '@/constants'
import useSelectImage from '@/hooks/useSelectImage'
import {BackIcon, CheckIcon, LinkIcon, PhotoIcon} from '@/SVG'
import {RootStackParamList} from '@/Navigation/Root'
import useUserData from '@/hooks/useUserData'
import useUploadImage from '@/hooks/useUploadImage'
import AddPostBottomRow from '@/components/AddPostBottomRow'
import ImageContainer from '@/components/ImageContainer'

type AddPostScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'AddPost'
>

const AddPost = ({
  route,
  navigation: {navigate, goBack, setOptions},
}: AddPostScreenNavigationProp) => {
  console.log('add post render')
  const routeData = route.params || {}

  let getterImage = {...routeData}
  const image = getterImage.selectedImageURI
  const imageRef = getterImage.selectedImageRef
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const {contextUser} = useUserData()
  const {selectedImage, selectedImageRef, handleChooseGallary, clearImage} =
    useSelectImage()
  const [imageFromNav, setImageFromNav] = useState(image)
  const [loading, setLoading] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [link, setLink] = useState('')
  const {firestoreImageUpload} = useUploadImage()
  const REF = `${contextUser?.uid}/posts/${imageRef || selectedImageRef}`

  const createPost = async (
    imgURL?: string,
    imgRef?: string,
    selectedImgRef?: string,
  ) => {
    try {
      await firestore()
        .collection(POSTS_COLLECTION)
        .add({
          title,
          description,
          image: imgURL ? imgURL : null,
          user: contextUser?.uid,
          userProfile: contextUser?.profilePic,
          username: contextUser?.username,
          likes: 0,
          link,
          createdAt: firestore.FieldValue.serverTimestamp(),
          imageRef: !!imgRef || !!selectedImgRef ? REF : null,
        })
      navigate('Home')
    } catch (error: any) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Post Creation Error',
        text2: error.message,
      })
    }
  }

  const handlePostCreation = async () => {
    setLoading(true)
    if (selectedImage || imageFromNav) {
      try {
        const imageURL = await firestoreImageUpload(
          REF,
          selectedImage || imageFromNav!,
        )
        if (!imageURL) {
          throw new Error('Image Upload failed')
        }
        createPost(imageURL, imageRef, selectedImageRef)
      } catch (error: any) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: '',
          text2: error.message,
        })
      }
    } else {
      createPost()
    }
  }
  const linkText = showLink ? 'Remove Link' : 'Add Link'

  const handleLink = () => {
    if (showLink) {
      setShowLink(false)
      setLink('')
    } else {
      setShowLink(true)
    }
  }

  const handleClear = () => {
    clearImage()
    setImageFromNav('')
  }

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity disabled={loading} onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={!title || !description || (showLink && !link)}
          onPress={handlePostCreation}>
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View padding={3}>
          <TouchableOpacity style={styles.leftHeader}>
            <Avatar
              source={{
                uri: contextUser?.profilePic,
              }}
              size="md"
              mr="3">
              <Avatar.Badge bg="green.500" />
            </Avatar>
            <View>
              <Text style={styles.usernameText}>{contextUser?.username}</Text>
              <Text style={styles.email}>{contextUser?.email}</Text>
            </View>
          </TouchableOpacity>
          <Label label="Title" required />
          <TextInput
            placeholder="Title here..."
            placeholderTextColor={COLORS.lightGray2}
            value={title}
            maxLength={30}
            onChangeText={setTitle}
            style={styles.textInput}
          />
          <Label label="Description" required />
          <TextInput
            numberOfLines={6}
            placeholder="Description here..."
            placeholderTextColor={COLORS.lightGray2}
            value={description}
            maxLength={100}
            onChangeText={setDescription}
            style={[styles.textInput, styles.multilineMarginFix]}
            multiline
          />
          {showLink && (
            <>
              <Label label="Link" />
              <TextInput
                placeholder="Link here..."
                placeholderTextColor={COLORS.lightGray2}
                value={link}
                maxLength={100}
                onChangeText={setLink}
                style={styles.textInput}
              />
            </>
          )}
          {(!!selectedImage || !!imageFromNav) && (
            <ImageContainer
              isVisible={!!imageFromNav || !!selectedImage}
              uri={imageFromNav || selectedImage}
              onPress={handleClear}
            />
          )}
          <VStack mt="10">
            <Center mb="5">
              <ChevronUpIcon />
            </Center>
            <AddPostBottomRow
              disabled={!!selectedImage || !!imageFromNav || loading}
              onPress={handleChooseGallary}
              text="Photo/video">
              <PhotoIcon width="24" height="24" />
            </AddPostBottomRow>
            <AddPostBottomRow
              disabled={loading}
              onPress={handleLink}
              text={linkText}>
              <LinkIcon />
            </AddPostBottomRow>
          </VStack>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  usernameText: {
    color: COLORS.white2,
    fontWeight: 'bold',
    ...FONTS.h3,
  },
  email: {
    color: COLORS.lightGray2,
    ...FONTS.h4,
  },
  textInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: COLORS.white,
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
  multilineMarginFix: {
    textAlignVertical: 'top',
  },
})

export default React.memo(AddPost)
