import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export interface FeedProps {
  image?: string
  postTitle: string
  username: string
  userProfilePic: string
  description: string
  likes: number
  createdAt: FirebaseFirestoreTypes.Timestamp
  postId: string
  userId: string
  link?: string
  hasUserLikedPost: Boolean
  imageRef?: string
}
