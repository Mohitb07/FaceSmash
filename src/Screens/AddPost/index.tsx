import React, {useContext, useState} from 'react'
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'

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

import Header from '../../components/Header'
import Label from '../../components/Label'
import StyledTextInput from '../../components/TextInput'
import {COLORS} from '../../constants'
import {AuthUserContext} from '../../Context/auth'
import {UserDataContext} from '../../Context/userData'
import useSelectImage from '../../hooks/useSelectImage'
import {CheckIcon, CloseIcon, LinkIcon, PhotoIcon} from '../../SVG'
import {RouteProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../../Navigation/Root'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

const AddPost = ({
  route,
}: {
  route: RouteProp<{params: {selectedImage: string}}, 'params'>
}) => {
  const routeData = route.params || {}

  let getterImage = {...routeData}

  const image = getterImage.selectedImage

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const {authUser} = useContext(AuthUserContext)
  const {contextUser} = useContext(UserDataContext)
  const {selectedImage, handleChooseGallary, clearImage} = useSelectImage()
  const [imageFromNav, setImageFromNav] = useState<string>(image)
  const [loading, setLoading] = useState<boolean>(false)
  const [showLink, setShowLink] = useState<boolean>(false)
  const [link, setLink] = useState<string>('')

  console.log('selectedFromnav', imageFromNav)

  const handlePostCreation = async () => {
    setLoading(true)
    if (selectedImage || imageFromNav) {
      try {
        await storage()
          .ref(selectedImage || imageFromNav)
          .putFile(selectedImage || imageFromNav)
        const imageURL = await storage()
          .ref(selectedImage || imageFromNav)
          .getDownloadURL()

        if (!imageURL) {
          throw new Error('Image Upload failed')
        }
        try {
          await firestore().collection('Posts').add({
            title: title,
            description: textAreaValue,
            image: imageURL,
            user: authUser?.uid,
            userProfile: contextUser.profilePic,
            username: contextUser.username,
            likes: 0,
            link: link,
            createdAt: new Date(),
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
      } catch (error: any) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: '',
          text2: error.message,
        })
      }
    } else {
      try {
        await firestore().collection('Posts').add({
          title: title,
          description: textAreaValue,
          image: null,
          user: authUser?.uid,
          userProfile: contextUser.profilePic,
          username: contextUser.username,
          likes: 0,
          link: link,
          createdAt: new Date(),
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
          showBackButton
          onPress={handlePostCreation}
          rightSection
          disabled={!title || !textAreaValue || (showLink && !link)}
          loading={loading}
          navigation={navigation}
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
          <Label label="Title" required labelStyle={{fontSize: 15}} />
          <StyledTextInput
            placeholder="Your title"
            value={title}
            maxLength={30}
            onChangeText={text => setTitle(text)}
          />

          <Label label="Description" required labelStyle={{fontSize: 15}} />
          <StyledTextInput
            numberOfLines={6}
            placeholder="Your description"
            value={textAreaValue}
            onChangeText={text => setTextAreaValue(text)}
            multiline={true}
            maxLength={100}
            customStyles={{textAlignVertical: 'top'}}
          />

          {showLink && (
            <>
              <Label label="Link" labelStyle={{fontSize: 15}} />
              <StyledTextInput
                placeholder="Link here"
                value={link}
                maxLength={100}
                onChangeText={text => setLink(text)}
              />
            </>
          )}

          {(selectedImage || !!imageFromNav) && (
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
                onPress={() => handleChooseGallary(false)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  postImage: {
    // width: 360,
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
    color: '#F2F2F2',
    fontSize: 17,
    fontWeight: 'bold',
  },
  email: {
    color: '#747474',
    fontSize: 14,
  },
})

export default AddPost
