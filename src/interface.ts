import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

export interface FeedPropsCallback {
  postId: string
  hasLiked: boolean
  hasImage: boolean
  imageRef?: string
}

export interface FeedProps {
  image?: string
  postTitle: string
  username: string
  userProfilePic: string
  description: string
  likes: number
  createdAt: FirebaseFirestoreTypes.Timestamp | null
  postId: string
  userId: string
  link?: string
  hasUserLikedPost: boolean
  imageRef?: string
  cb: (data: FeedPropsCallback) => void
}

export interface IUserDetail {
  createdAt: string
  email: string
  lastSignIn: string
  profilePic: string
  qusername: string
  uid: string
  username: string
  bio?: string
}

export interface IBottomSheetState {
  type: 'profile' | 'someother' | null
  isOpen: boolean
}

export interface IPostLikes {
  postId: string
  likes: boolean
}

export interface IPost {
  createdAt: FirebaseFirestoreTypes.Timestamp | null
  description: string
  key: string
  image?: string
  likes: number
  link?: string
  title: string
  user: string
  userProfile: string
  username: string
  imageRef?: string
  uid: string
}

export interface FeedState {
  data: IPost[]
  loading: boolean
  lastVisible: FirebaseFirestoreTypes.DocumentData | null
}

export interface IDefaultPostState {
  posts: IPost[]
  loading: boolean
  lastVisible: FirebaseFirestoreTypes.DocumentData | null
}
