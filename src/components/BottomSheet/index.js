import React from 'react';
import {useRecoilState} from 'recoil';
import {bottomSheetState} from '../../atoms/bottomSheetAtom';
import {Actionsheet} from 'native-base';
import ProfileBottomSheet from './Profile';
import AddPostMoreBottomSheet from './AddPostMore';

const BottomSheet = () => {
  const [bottomSheetStateValue, setBottomSheetStateValue] =
    useRecoilState(bottomSheetState);
  return (
    <Actionsheet
      isOpen={bottomSheetStateValue.isOpen}
      onClose={() => {
        setBottomSheetStateValue(prev => ({
          ...prev,
          isOpen: false,
          type: null,
        }));
      }}>
      <Actionsheet.Content>
        {bottomSheetStateValue.type === 'profile' && <ProfileBottomSheet />}
        {bottomSheetStateValue.type === 'addPostMore' && (
          <AddPostMoreBottomSheet />
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default React.memo(BottomSheet);
