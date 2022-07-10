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
import {AuthContext, AuthUserContext} from '../../Context/auth';
import {UserDataContext} from '../../Context/userData';
import {useRecoilValue} from 'recoil';
import {authState} from '../../atoms/authAtom';

const AddPost = ({navigation}) => {
  const [textAreaValue, setTextAreaValue] = useState();
  const [title, setTitle] = useState('');
  const {authUser} = useContext(AuthUserContext);
  const {contextUser} = useContext(UserDataContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePostCreation = () => {
    setLoading(true);
    if (image) {
      storage()
        .ref(image.fileName)
        .putFile(image.uri)
        .then(snapshot => {
          console.log('IMAGE UPLOADED', snapshot);
          const imageRef = storage().ref(image.fileName);
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
                  user: authUser?.uid,
                  userProfile: contextUser.profilePic,
                  username: contextUser.username,
                  likes: 0,
                  createdAt: new Date(),
                })
                .then(() => {
                  navigation.navigate('Home');
                });
            })
            .catch(err => {
              setLoading(false);
              console.log('image download error', err);
            });
        })
        .catch(err => {
          setLoading(false);
          console.log('IMAGE UPLOAD ERROR', err);
        });
    } else {
      firestore()
        .collection('Posts')
        .add({
          title: title,
          description: textAreaValue,
          image: null,
          user: authUser?.uid,
          userProfile: contextUser.profilePic,
          username: contextUser.username,
          likes: 0,
          createdAt: new Date(),
        })
        .then(() => {
          setLoading(false);
          navigation.navigate('Home');
        })
        .catch(err => {
          setLoading(false);
          console.log('error posting', err);
        });
    }
  };

  const handleChooseGallary = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        setImage(null);
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else {
        console.log('IMAGE META DATA', response);
        setImage(response.assets[0]);
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
          rightSection
          disabled={!title || !textAreaValue}
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
                    uri: image.uri,
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
          {!image && (
            <Button
              onPress={handleChooseGallary}
              disabled={loading || image}
              text="Add Image"
              color={COLORS.neon}
              style={{marginVertical: 20}}
            />
          )}
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
