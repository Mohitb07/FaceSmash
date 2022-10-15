import React, {useState} from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import {
  Avatar,
  Box,
  Center,
  ChevronUpIcon,
  Icon,
  IconButton,
  PresenceTransition,
  Text,
  View,
  VStack,
} from 'native-base'
import Toast from 'react-native-toast-message'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RouteProp, useNavigation} from '@react-navigation/native'

import Header from '@/components/Header'
import Label from '@/components/Label'
import {COLORS, FONTS, POSTS_COLLECTION} from '@/constants'
import useSelectImage from '@/hooks/useSelectImage'
import {CheckIcon, CloseIcon, LinkIcon, PhotoIcon} from '@/SVG'
import {RootStackParamList} from '@/Navigation/Root'
import useUserData from '@/hooks/useUserData'
import useUploadImage from '@/hooks/useUploadImage'
import AddPostBottomRow from '@/components/AddPostBottomRow'

const AddPost = ({
  route,
}: {
  route: RouteProp<
    {params: {selectedImageURI: string; selectedImageRef: string}},
    'params'
  >
}) => {
  console.log('add post render')
  const routeData = route.params || {}
  let getterImage = {...routeData}
  const image = getterImage.selectedImageURI
  const imageRef = getterImage.selectedImageRef
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
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
    imageURL?: string,
    imageRef?: string,
    selectedImageRef?: string,
  ) => {
    try {
      await firestore()
        .collection(POSTS_COLLECTION)
        .add({
          title,
          description,
          image: !!imageURL ? imageURL : null,
          user: contextUser?.uid,
          userProfile: contextUser?.profilePic,
          username: contextUser?.username,
          likes: 0,
          link,
          createdAt: firestore.FieldValue.serverTimestamp(),
          imageRef: !!imageRef || !!selectedImageRef ? REF : null,
        })
      navigation.navigate('Home')
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
          selectedImage || imageFromNav,
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Header
          label="Create post"
          onPress={handlePostCreation}
          hasRightSection
          isDisabled={!title || !description || (showLink && !link)}
          isLoading={loading}
          navigate={() => navigation.goBack()}
          leftIcon={<CloseIcon />}
          rightIcon={<CheckIcon />}
        />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.leftHeader}>
            <Avatar
              source={{
                uri: contextUser?.profilePic,
              }}
              size="md"
              mr="3">
              <Avatar.Badge bg="green.500" />
            </Avatar>
            <View style={styles.userInfo}>
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
            <Box
              style={styles.imageContainer}
              position="relative"
              justifyContent="center">
              <PresenceTransition
                visible={!!imageFromNav || !!selectedImage}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 250,
                  },
                }}>
                <Image
                  style={styles.postImage}
                  source={{
                    uri: imageFromNav || selectedImage || '',
                  }}
                />

                <IconButton
                  onPress={handleClear}
                  style={styles.clearBtn}
                  icon={<Icon as={CloseIcon} name="emoji-happy" />}
                  borderRadius="full"
                  backgroundColor={COLORS.transparentBlack5}
                  _icon={{
                    color: 'warmGray.400',
                    size: '3xl',
                  }}
                  _hover={{
                    bg: 'warmGray.400',
                  }}
                  _pressed={{
                    bg: 'black',
                    _icon: {
                      name: 'emoji-flirt',
                    },
                    _ios: {
                      _icon: {
                        size: '2xl',
                      },
                    },
                  }}
                  _ios={{
                    _icon: {
                      size: '2xl',
                    },
                  }}
                />
              </PresenceTransition>
            </Box>
          )}
          <VStack mt="10">
            <Center mb="5">
              <ChevronUpIcon />
            </Center>
            <AddPostBottomRow
              disabled={!!selectedImage || !!imageFromNav || loading}
              onPress={() => handleChooseGallary()}
              text="Photo/video">
              <PhotoIcon width="24" height="24" />
            </AddPostBottomRow>
            <AddPostBottomRow
              disabled={loading}
              onPress={() => handleLink()}
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
    backgroundColor: COLORS.mainBackground,
  },
  innerContainer: {
    padding: 20,
  },
  imageContainer: {
    marginTop: 10,
  },
  postImage: {
    height: 350,
    borderRadius: 13,
  },
  clearBtn: {
    top: 2,
    right: 10,
    position: 'absolute',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  usernameText: {
    color: COLORS.white2,
    fontWeight: 'bold',
    ...FONTS.h3,
  },
  email: {
    color: COLORS.lightGray2,
    fontSize: 14,
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
