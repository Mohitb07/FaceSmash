import React from 'react'

import {useRecoilState} from 'recoil'
import {Actionsheet} from 'native-base'

import {bottomSheetState} from '../../atoms/bottomSheetAtom'
import ProfileBottomSheet from './Profile'
import {COLORS} from '../../constants'
import {IBottomSheetState} from '../../interface'

const BottomSheet = () => {
  const [bottomSheetStateValue, setBottomSheetStateValue] =
    useRecoilState<IBottomSheetState>(bottomSheetState)
  return (
    <Actionsheet
      disableOverlay
      isOpen={bottomSheetStateValue.isOpen}
      onClose={() => {
        setBottomSheetStateValue(prev => ({
          ...prev,
          isOpen: false,
          type: null,
        }))
      }}>
      <Actionsheet.Content style={{backgroundColor: COLORS.mainBackground}}>
        {bottomSheetStateValue.type === 'profile' && <ProfileBottomSheet />}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default React.memo(BottomSheet)
