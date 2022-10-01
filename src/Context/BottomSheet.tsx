import React, {createContext, useMemo} from 'react'

import {useDisclose} from 'native-base'

import BottomSheet from '@/components/BottomSheet'

interface IBottomSheetState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const initialState = {
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
}

export const BottomSheetContext = createContext<IBottomSheetState>(initialState)

function BottomSheetProvider({children}: {children: React.ReactNode}) {
  const {isOpen, onOpen, onClose} = useDisclose()
  const values = useMemo(
    () => ({
      isOpen,
      onOpen,
      onClose,
    }),
    [],
  )
  return (
    <BottomSheetContext.Provider value={values}>
      {children}
      <BottomSheet />
    </BottomSheetContext.Provider>
  )
}

export default BottomSheetProvider
