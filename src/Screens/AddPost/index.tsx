import React, {useState} from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'

import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import {
  Avatar,
  Box,
  Center,
  ChevronUpIcon,
  HStack,
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
import StyledTextInput from '@/components/TextInput'
import {COLORS, FONTS} from '@/constants'
import useSelectImage from '@/hooks/useSelectImage'
import {CheckIcon, CloseIcon, LinkIcon, PhotoIcon} from '@/SVG'
import {RootStackParamList} from '@/Navigation/Root'
import useUserData from '@/hooks/useUserData'

const AddPost = ({
  route,
}: {
  route: RouteProp<
    {params: {selectedImageURI: string; selectedImageRef: string}},
    'params'
  >
}) => {
  const routeData = route.params || {}

  let getterImage = {...routeData}

  const image = getterImage.selectedImageURI
  const imageRef = getterImage.selectedImageRef

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const {contextUser} = useUserData()
  const {selectedImage, selectedImageRef, handleChooseGallary, clearImage} =
    useSelectImage()
  const [imageFromNav, setImageFromNav] = useState<string>(image)
  const [loading, setLoading] = useState<boolean>(false)
  const [showLink, setShowLink] = useState<boolean>(false)
  const [link, setLink] = useState<string>('')

  console.log('selectedFromnav', imageFromNav)
  console.log('ref image', selectedImageRef)

  const createPost = async (
    imageURL?: string,
    imageRef?: string,
    selectedImageRef?: string,
  ) => {
    try {
      await firestore()
        .collection('Posts')
        .add({
          title: title,
          description: textAreaValue,
          image: !!imageURL ? imageURL : null,
          user: contextUser?.uid,
          userProfile: contextUser?.profilePic,
          username: contextUser?.username,
          likes: 0,
          link,
          createdAt: firestore.FieldValue.serverTimestamp(),
          imageRef:
            !!imageRef || !!selectedImageRef
              ? `${contextUser?.uid}/posts/${imageRef || selectedImageRef}`
              : null,
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
        await storage()
          .ref(`${contextUser?.uid}/posts/${imageRef || selectedImageRef}`)
          .putFile(selectedImage || imageFromNav)
        const imageURL = await storage()
          .ref(`${contextUser?.uid}/posts/${imageRef || selectedImageRef}`)
          .getDownloadURL()

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
          isDisabled={!title || !textAreaValue || (showLink && !link)}
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
            value={textAreaValue}
            maxLength={100}
            onChangeText={setTextAreaValue}
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
            <HStack borderTopColor="gray.600" borderTopWidth="1" paddingY="3">
              <TouchableOpacity
                disabled={!!selectedImage || !!imageFromNav || loading}
                onPress={() => handleChooseGallary({})}
                style={styles.bottomSectionRow}>
                <PhotoIcon width="24" height="24" />
                <Text
                  color={
                    selectedImage || !!imageFromNav || loading
                      ? 'gray.700'
                      : 'white'
                  }
                  ml="5"
                  fontFamily="Lato-Regular"
                  fontSize="md">
                  Photo/video
                </Text>
              </TouchableOpacity>
            </HStack>
            <HStack borderTopColor="gray.600" borderTopWidth="1" paddingY="3">
              <TouchableOpacity
                disabled={loading}
                onPress={handleLink}
                style={styles.bottomSectionRow}>
                <LinkIcon />
                <Text
                  color={loading ? 'gray.700' : 'white'}
                  ml="5"
                  fontFamily="Lato-Regular"
                  fontSize="md">
                  {linkText}
                </Text>
              </TouchableOpacity>
            </HStack>
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
  bottomSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default React.memo(AddPost)
