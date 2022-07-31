import React from 'react'
import {Box, Center, Flex, HStack, Skeleton, View, VStack} from 'native-base'

const FeedSkeleton = props => {
  return (
    <Center w="100%" mb="10" {...props}>
      <VStack
        w="100%"
        maxW="400"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Box paddingX="2">
          <HStack alignItems="center" mb="3" justifyContent="space-between">
            <Flex direction="row" align="center">
              <Skeleton size="10" rounded="lg" />
              <VStack ml="4" space="2">
                <Skeleton.Text size="1" w="16" lines={1} />
                <Skeleton.Text size="1" w="10" lines={1} />
              </VStack>
            </Flex>
            <Skeleton h="5" w="1" mr="3" rounded="lg" />
          </HStack>
          <Skeleton h="56" borderRadius="2xl" mb="3" />
          <HStack alignItems="center" space="2" mb="3">
            <HStack>
              <Skeleton size="5" rounded="full" />
              <Skeleton size="5" rounded="full" ml="2" />
            </HStack>
            {/* <Skeleton h="1" w="4" mr="3" /> */}
          </HStack>
          <Skeleton.Text size="1" w="10" lines={1} mb="3" />
          <Skeleton.Text size="1" w="1/2" lines={1} mb="3" />
          <Skeleton.Text size="1" lines={2} />
        </Box>
      </VStack>
    </Center>
  )
}

export default FeedSkeleton
