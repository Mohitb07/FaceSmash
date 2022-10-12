import React from 'react'

import storage from '@react-native-firebase/storage'

const useUploadImage = () => {
  const firestoreImageUpload = async (
    ref: string,
    image: string,
  ): Promise<string> => {
    try {
      const bucketRef = storage().ref(ref)
      await bucketRef.putFile(image)
      const url = await bucketRef.getDownloadURL()
      console.log('actual download', url)
      if (url) {
        return url
      }
    } catch (err) {
      Promise.reject(err)
    }
    return Promise.resolve('pending')
  }
  return {firestoreImageUpload}
}

export default useUploadImage
