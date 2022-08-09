import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'
import {atom} from 'recoil'

export interface IPost {
  createdAt: object
  description: string
  key: string
  image?: string
  likes: number
  link?: string
  title: string
  user: string
  userProfile: string
  username: string
}

export interface IDefaultPostState {
  selectedPost: IPost | null
  posts: IPost[]
  loading: boolean
  lastVisible: FirebaseFirestoreTypes.DocumentData | null
}

export const defaultPostState: IDefaultPostState = {
  selectedPost: null,
  posts: [],
  loading: true,
  lastVisible: null,
}

export const postState = atom({
  key: 'postState',
  default: defaultPostState,
})
