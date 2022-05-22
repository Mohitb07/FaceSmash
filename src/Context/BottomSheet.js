import React, {createContext, useState} from 'react';
import {useDisclose} from 'native-base';

export const BottomSheetContext = createContext();

function BottomSheetProvider({children}) {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <BottomSheetContext.Provider value={{isOpen, onOpen, onClose}}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export default BottomSheetProvider;
