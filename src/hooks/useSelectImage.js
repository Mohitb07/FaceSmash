import React, {useState} from 'react'

import * as ImagePicker from 'react-native-image-picker'
import Toast from 'react-native-toast-message'

const useSelectImage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
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
        setSelectedImage(response.assets[0].uri)
        navigate &&
          navigation.navigate('AddPost', {
            selectedImage: response.assets[0].uri,
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
  }

  return {selectedImage, handleChooseGallary, handleTakePhoto, clearImage}
}

export default useSelectImage
