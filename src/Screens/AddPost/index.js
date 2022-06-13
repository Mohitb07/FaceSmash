import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {CheckIcon, CloseIcon} from '../../SVG';
import {COLORS} from '../../constants';
import StyledTextInput from '../../components/TextInput';
import Label from '../../components/Label';
import {Input, TextArea} from 'native-base';

const AddPost = ({navigation}) => {
  const [textAreaValue, setTextAreaValue] = useState("What's on your mind ?");
  const [inputColor, setInputColor] = useState(COLORS.gray);

  const demoValueControlledTextArea = e => {
    setTextAreaValue(e.currentTarget.value);
  };

  return (
    <View style={styles.container}>
      <Header
        label="Create Post"
        showBackButton
        // onPress={handleUploadImage}
        rightSection
        // disabled={disabled}
        // loading={loading}
        navigation={navigation}
        leftIcon={<CloseIcon />}
        rightIcon={<CheckIcon />}
      />
      <View style={styles.innerContainer}>
        <Label label="Title" required />
        <Input
          style={styles.input}
          variant="outline"
          placeholder="Your title"
        />

        <Label label="Description" />
        <TextArea
          value={textAreaValue}
          onChange={demoValueControlledTextArea}
          w="100%"
          totalLines={10}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  innerContainer: {
    padding: 20,
  },
});

export default AddPost;
