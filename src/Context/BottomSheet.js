import React, {createContext, useMemo, useState} from 'react'
import {useDisclose} from 'native-base'
import BottomSheet from '../components/BottomSheet'

export const BottomSheetContext = createContext()

function BottomSheetProvider({children}) {
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
