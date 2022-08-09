import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'
import {atom} from 'recoil'

import {IPost} from './postAtom'

export interface ILikedPosts {
  liked: boolean
  postId: string
}

export interface IDefaultUserDataState {
  posts: IPost[]
  loading: boolean
  lastVisible: FirebaseFirestoreTypes.DocumentData | null
  postsLikes: ILikedPosts[]
}

export const defaultUserDataState: IDefaultUserDataState = {
  posts: [],
  loading: true,
  lastVisible: null,
  postsLikes: [],
}

export const userDataState = atom({
  key: 'userDataState',
  default: defaultUserDataState,
})
