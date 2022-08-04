import React from 'react'
import {useRecoilState} from 'recoil'
import {bottomSheetState} from '../../atoms/bottomSheetAtom'
import {Actionsheet} from 'native-base'
import ProfileBottomSheet from './Profile'

const BottomSheet = () => {
  const [bottomSheetStateValue, setBottomSheetStateValue] =
    useRecoilState(bottomSheetState)
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
      <Actionsheet.Content>
        {bottomSheetStateValue.type === 'profile' && <ProfileBottomSheet />}
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default React.memo(BottomSheet)
