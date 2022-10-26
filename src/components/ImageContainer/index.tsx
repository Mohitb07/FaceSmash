import {COLORS} from '@/constants'
import {CloseIcon} from '@/SVG'
import {Box, Icon, IconButton, PresenceTransition} from 'native-base'
import React from 'react'
import {Image, StyleSheet} from 'react-native'

type ImageContainerProps = {
  isVisible: boolean
  uri: string
  onPress: () => void
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  isVisible = false,
  uri = '',
  onPress,
}) => {
  return (
    <Box
      style={styles.imageContainer}
      position="relative"
      justifyContent="center">
      <PresenceTransition
        visible={isVisible}
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
        <Image
          style={styles.postImage}
          source={{
            uri,
          }}
        />
        <IconButton
          onPress={onPress}
          style={styles.clearBtn}
          icon={<Icon as={CloseIcon} name="emoji-happy" />}
          borderRadius="full"
          backgroundColor={COLORS.transparentBlack5}
          _icon={{
            color: 'warmGray.400',
            size: '3xl',
          }}
          _hover={{
            bg: 'warmGray.400',
          }}
          _pressed={{
            bg: 'black',
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
      </PresenceTransition>
    </Box>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 10,
  },
  postImage: {
    height: 350,
    borderRadius: 13,
  },
  clearBtn: {
    top: 2,
    right: 10,
    position: 'absolute',
  },
})

export default ImageContainer
