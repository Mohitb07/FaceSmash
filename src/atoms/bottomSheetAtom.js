import {atom} from 'recoil';

export const defaultBottomSheetValues = {
  type: null,
  isOpen: false,
};

export const bottomSheetState = atom({
  key: 'bottomSheetState',
  default: defaultBottomSheetValues,
});
