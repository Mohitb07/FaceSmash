import {atom} from 'recoil'
import {IBottomSheetState} from '../interface'

export const defaultBottomSheetValues: IBottomSheetState = {
  type: 'someother',
  isOpen: false,
}

export const bottomSheetState = atom({
  key: 'bottomSheetState',
  default: defaultBottomSheetValues,
})
