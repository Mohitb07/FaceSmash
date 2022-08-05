import {atom} from 'recoil'

export const defaultUserDataState = {
  posts: [],
  loading: true,
  lastVisible: null,
  postsLikes: [],
}

export const userDataState = atom({
  key: 'userDataState',
  default: defaultUserDataState,
})
