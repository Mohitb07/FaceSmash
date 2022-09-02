import React, {useState} from 'react'

import * as ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-toast-message'

const useSelectImage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageRef, setSelectedImageRef] = useState('')
  console.log('selected image uri', selectedImage)
  const handleChooseGallary = (navigate = false, navigation) => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        Toast.show({
          type: 'info',
          text1: 'Image Processing',
          text2: 'Cancelled image selection process',
        })
        setSelectedImage(null)
      } else if (response.error) {
        console.log('Image picker error', response.error)
        Toast.show({
          type: 'error',
          text1: 'Image Processing',
          text2: response.errorMessage,
        })
      } else {
        const imageRef = `${response.assets[0].fileName}${
          response.assets[0].height + response.assets[0].width
        }${response.assets[0].fileSize}`

        setSelectedImage(response.assets[0].uri)
        setSelectedImageRef(imageRef)
        navigate &&
          navigation.navigate('AddPost', {
            selectedImageURI: response.assets[0].uri,
            selectedImageRef: imageRef,
          })
      }
    })
  }

  const handleTakePhoto = () => {
    ImagePicker.launchCamera({}, response => {
      if (response.didCancel) {
        Toast.show({
          type: 'info',
          text1: 'Image Processing',
          text2: 'Cancelled image taking process',
        })
        setSelectedImage(null)
      } else if (response.error) {
        console.log('Image picker error', response.error)
        Toast.show({
          type: 'error',
          text1: 'Image Processing',
          text2: response.errorMessage,
        })
      } else {
        setSelectedImage(response.assets[0].uri)
      }
    })
  }

  const clearImage = () => {
    setSelectedImage(null)
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
