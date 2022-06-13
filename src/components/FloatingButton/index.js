import React from 'react';
import {Box, useDisclose, IconButton, Stagger, HStack, Icon} from 'native-base';
import {CameraIcon} from '../../SVG';

const FloatingButton = () => {
  const {isOpen, onToggle} = useDisclose();
  return (
    <Box>
      <Box alignItems="flex-end">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          <IconButton
            mb="4"
            variant="solid"
            bg="red.500"
            colorScheme="red"
            borderRadius="full"
            // icon={
            //   <Icon
            //     as={MaterialIcons}
            //     size="6"
            //     name="photo-library"
            //     _dark={{
            //       color: 'warmGray.50',
            //     }}
            //     color="warmGray.50"
            //   />
            // }
          />
        </Stagger>
      </Box>
      <HStack justifyContent="flex-end">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={<CameraIcon />}
        />
      </HStack>
    </Box>
  );
};

export default FloatingButton;
