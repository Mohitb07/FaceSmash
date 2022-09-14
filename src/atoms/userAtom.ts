import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'
import {atom} from 'recoil'
import { IPost } from '../interface'


export interface IDefaultUserDataState {
  posts: IPost[]
  loading: boolean
  lastVisible: FirebaseFirestoreTypes.DocumentData | null
}

export const defaultUserDataState: IDefaultUserDataState = {
  posts: [],
  loading: true,
  lastVisible: null,
}

export const userDataState = atom({
  key: 'userDataState',
  default: defaultUserDataState,
})
