import React, {createContext, useState} from 'react';
import {useDisclose} from 'native-base';
import BottomSheet from '../components/BottomSheet';

export const BottomSheetContext = createContext();

function BottomSheetProvider({children}) {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <BottomSheetContext.Provider value={{isOpen, onOpen, onClose}}>
      {children}
      <BottomSheet />
    </BottomSheetContext.Provider>
  );
}

export default BottomSheetProvider;
