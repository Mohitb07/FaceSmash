import {ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../components/Header';
import {CheckIcon, CloseIcon, GallaryIcon} from '../../SVG';
import {COLORS} from '../../constants';
import StyledTextInput from '../../components/TextInput';
import Label from '../../components/Label';
import Button from '../../components/Button';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext, AuthUserContext} from '../../Context/auth';
import {UserDataContext} from '../../Context/userData';

import {
  Avatar,
  Box,
  Center,
  ChevronUpIcon,
  HStack,
  Icon,
  IconButton,
  PresenceTransition,
  SmallCloseIcon,
  Text,
  ThreeDotsIcon,
  VStack,
  View,
  ShareIcon,
} from 'native-base';
import {useSetRecoilState} from 'recoil';
import {bottomSheetState} from '../../atoms/bottomSheetAtom';

const AddPost = ({navigation}) => {
  const [textAreaValue, setTextAreaValue] = useState();
  const [title, setTitle] = useState('');
  const {authUser} = useContext(AuthUserContext);
  const {contextUser} = useContext(UserDataContext);
  const setBottomSheetStateValue = useSetRecoilState(bottomSheetState);
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
  const handleSheetOpen = () => {
    setBottomSheetStateValue(prev => ({
      ...prev,
      isOpen: true,
      type: 'addPostMore',
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header
          label="Create post"
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
          <TouchableOpacity style={styles.leftHeader}>
            <Avatar
              source={{
                uri: contextUser?.profilePic,
              }}
              size="md"
              mr="3">
              <Avatar.Badge bg="green.500" />
            </Avatar>
            <View style={styles.userInfo}>
              <Text style={styles.usernameText}>{contextUser?.username}</Text>
              <Text style={styles.email}>{contextUser?.email}</Text>
            </View>
          </TouchableOpacity>
          <Label label="Title" required />
          <StyledTextInput
            placeholder="Your title"
            value={title}
            onChangeText={text => setTitle(text)}
          />

          <Label label="Description" required />
          <StyledTextInput
            numberOfLines={6}
            placeholder="Your description"
            value={textAreaValue}
            onChangeText={text => setTextAreaValue(text)}
            multiline={true}
            customStyles={{textAlignVertical: 'top'}}
          />

          {image && (
            <Box position="relative">
              <PresenceTransition
                visible={!!image}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 250,
                  },
                }}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.postImage}
                    source={{
                      uri: image.uri,
                    }}
                  />
                </View>
              </PresenceTransition>
              <IconButton
                onPress={() => setImage(null)}
                position="absolute"
                bottom="2"
                right="40"
                icon={<Icon as={CloseIcon} name="emoji-happy" />}
                borderRadius="full"
                borderColor="warmGray.400"
                borderWidth="1"
                _icon={{
                  color: 'white',
                  size: '3xl',
                }}
                _hover={{
                  bg: 'white',
                }}
                _pressed={{
                  bg: 'trueGray.400',
                  _icon: {
                    name: 'emoji-flirt',
                  },
                  _ios: {
                    _icon: {
                      size: '2xl',
                    },
                  },
                }}
                _ios={{
                  _icon: {
                    size: '2xl',
                  },
                }}
              />
            </Box>
          )}
          {!image && (
            // <Button
            //   onPress={handleChooseGallary}
            //   disabled={loading || image}
            //   text="Add Image"
            //   color={COLORS.neon}
            //   style={{marginVertical: 20}}
            // />
            <VStack mt="10">
              <Center mb="5">
                <ChevronUpIcon />
              </Center>
              <HStack borderTopColor="gray.600" borderWidth="1" paddingY="3">
                <TouchableOpacity
                  onPress={handleChooseGallary}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <GallaryIcon />
                  <Text ml="5" fontSize="md">
                    Photo/video
                  </Text>
                </TouchableOpacity>
              </HStack>
              <HStack
                alignItems="center"
                flexDirection="row"
                borderTopColor="gray.600"
                borderWidth="1"
                paddingY="3"
                space="5">
                <ShareIcon />
                <Text fontSize="md">Add Link</Text>
              </HStack>
            </VStack>
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
  postImage: {
    width: 360,
    height: 350,
    borderRadius: 13,
  },
  clearBtn: {
    top: 3,
    right: 0,
    position: 'absolute',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  usernameText: {
    color: '#F2F2F2',
    fontSize: 17,
    fontWeight: 'bold',
  },
  email: {
    color: '#747474',
    fontSize: 14,
  },
});

export default AddPost;
