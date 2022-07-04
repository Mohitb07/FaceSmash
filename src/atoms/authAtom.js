import {atom} from 'recoil';

export const authState = atom({
  key: 'authState',
  default: null,
});

export const initializingState = atom({
  key: 'initializingState',
  default: true,
});
