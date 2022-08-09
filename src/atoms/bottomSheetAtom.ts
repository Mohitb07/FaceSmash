import {atom} from 'recoil'

export interface IBottomSheetState {
  type: 'profile' | 'someother'
  isOpen: boolean
}

export const defaultBottomSheetValues: IBottomSheetState = {
  type: 'someother',
  isOpen: false,
}

export const bottomSheetState = atom({
  key: 'bottomSheetState',
  default: defaultBottomSheetValues,
})
