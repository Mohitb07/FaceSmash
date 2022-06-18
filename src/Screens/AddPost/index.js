import {View, ScrollView, StyleSheet, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../components/Header';
import {CheckIcon, CloseIcon} from '../../SVG';
import {COLORS} from '../../constants';
import StyledTextInput from '../../components/TextInput';
import Label from '../../components/Label';
import Button from '../../components/Button';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../Context/auth';

const AddPost = ({navigation}) => {
  const [textAreaValue, setTextAreaValue] = useState();
  const [title, setTitle] = useState('');
  const {authUser} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePostCreation = () => {
    setLoading(true);
    storage()
      .ref(authUser.uid)
      .putFile(image)
      .then(snapshot => {
        console.log('IMAGE UPLOADED', snapshot);
        const imageRef = storage().ref(authUser.uid);
        imageRef
          .getDownloadURL()
          .then(url => {
            console.log('UPLOADED IMAGE URL', url);
            firestore()
              .collection('Posts')
              .add({
                title: title,
                description: textAreaValue,
                image: url,
              })
              .then(() => {
                console.log('POST CREATED');
              });
          })
          .catch(err => {
            console.log('image download error', err);
          });
      })
      .catch(err => {
        console.log('IMAGE UPLOAD ERROR', err);
      });
  };

  const handleChooseGallary = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        setImage(null);
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header
          label="Create Post"
          showBackButton
          onPress={handlePostCreation}
          // onPress={handleUploadImage}
          rightSection
          // disabled={disabled}
          loading={loading}
          navigation={navigation}
          leftIcon={<CloseIcon />}
          rightIcon={<CheckIcon />}
        />
        <View style={styles.innerContainer}>
          <Label label="Title" required />
          <StyledTextInput
            placeholder="Your title"
            value={title}
            onChangeText={text => setTitle(text)}
          />

          <Label label="Description" />
          <StyledTextInput
            numberOfLines={4}
            placeholder="Your description"
            value={textAreaValue}
            onChangeText={text => setTextAreaValue(text)}
            multiline={true}
            customStyles={{textAlignVertical: 'top'}}
          />

          {image && (
            <>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.profilePic}
                  source={{
                    uri: image,
                  }}
                />
              </View>
              <Button
                onPress={() => setImage(null)}
                text="Clear Image"
                style={{marginTop: 30}}
              />
            </>
          )}

          <Button
            onPress={handleChooseGallary}
            text="Add Image"
            color={COLORS.primary}
            style={{marginVertical: 20}}
          />
        </View>
      </View>
    </ScrollView>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 350,
    height: 350,
  },
});

export default AddPost;
