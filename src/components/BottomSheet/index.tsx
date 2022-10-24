import React from 'react'
import {StyleSheet, ActivityIndicator} from 'react-native'

import {useRecoilState} from 'recoil'
import {Actionsheet} from 'native-base'

import {bottomSheetState} from '@/atoms/bottomSheetAtom'
import {COLORS} from '@/constants'
import {IBottomSheetState} from '@/interface'
const ProfileBottomSheet = React.lazy(() => import('./Profile'))

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
      <Actionsheet.Content style={styles.actionSheetContainer}>
        <React.Suspense fallback={<ActivityIndicator />}>
          {bottomSheetStateValue.type === 'profile' && <ProfileBottomSheet />}
        </React.Suspense>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: COLORS.mainBackground,
  },
})
