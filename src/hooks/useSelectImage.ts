import React, {useEffect, useState} from 'react'

import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import * as ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-toast-message'

import {RootStackParamList} from '@/Navigation/Root'

type HandleChooseGallary = {
  navigate?: boolean
  screen?: keyof RootStackParamList
}

const useSelectImage = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>('')
  const [selectedImageRef, setSelectedImageRef] = useState('')
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    console.log('mounted ')
    return () => {
      console.log('unmount useSelectImage')
    }
  }, [])

  console.log('selected image uri inside useSelectImage', selectedImage)

  const handleChooseGallary = ({
    navigate = false,
    screen,
  }: HandleChooseGallary) => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 0.8},
      response => {
        if (response.didCancel) {
          Toast.show({
            type: 'info',
            text1: 'Image Processing',
            text2: 'Cancelled image selection process',
          })
          setSelectedImage('')
        } else if (response.errorCode) {
          console.log('Image picker error', response.errorMessage)
          Toast.show({
            type: 'error',
            text1: 'Image Processing',
            text2: response.errorMessage,
          })
        } else {
          if (response.assets) {
            const imageRef = `${response.assets[0].fileName}${
              response.assets[0].height! + response.assets[0].width!
            }${response.assets[0].fileSize}`

            setSelectedImage(response.assets[0].uri)
            setSelectedImageRef(imageRef)
            navigate &&
              !!screen &&
              navigation.navigate(screen, {
                selectedImageURI: response.assets[0].uri!,
                selectedImageRef: imageRef,
              })
          }
        }
      },
    )
  }

  const handleTakePhoto = () => {
    ImagePicker.launchCamera(
      {mediaType: 'photo', presentationStyle: 'fullScreen', quality: 0.8},
      response => {
        if (response.didCancel) {
          Toast.show({
            type: 'info',
            text1: 'Image Processing',
            text2: 'Cancelled image taking process',
          })
          setSelectedImage('')
        } else if (response.errorCode) {
          console.log('Image picker error', response.errorMessage)
          Toast.show({
            type: 'error',
            text1: 'Image Processing',
            text2: response.errorMessage,
          })
        } else {
          if (response.assets) {
            const value = response.assets[0].uri
            setSelectedImage(value)
          }
        }
      },
    )
  }

  const clearImage = () => {
    setSelectedImage('')
    setSelectedImageRef('')
  }

  return {
    selectedImage,
    selectedImageRef,
    handleChooseGallary,
    handleTakePhoto,
    clearImage,
  }
}

export default useSelectImage
