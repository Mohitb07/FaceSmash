import {atom} from 'recoil';

export const defaultPostState = {
  selectedPost: null,
  posts: [],
  postLikes: [],
};

export const postState = atom({
  key: 'postState',
  default: defaultPostState,
});
