import {atom} from 'recoil'

export const defaultPostState = {
  selectedPost: null,
  posts: [],
  postLikes: [],
  loading: true,
  lastVisible: null,
}

export const postState = atom({
  key: 'postState',
  default: defaultPostState,
})
