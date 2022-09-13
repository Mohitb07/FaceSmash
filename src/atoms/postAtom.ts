import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'
import {atom} from 'recoil'
import {IPost} from '../interface'

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
