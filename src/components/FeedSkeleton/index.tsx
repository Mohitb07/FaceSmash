import React from 'react'

import {Box, Center, Flex, HStack, Skeleton, VStack} from 'native-base'

const FeedSkeleton = (props: any) => {
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
        <Box>
          <HStack alignItems="center" mb="3" justifyContent="space-between">
            <Flex direction="row" align="center">
              <Skeleton size="10" rounded="full" />
              <VStack ml="4" space="2">
                <Skeleton.Text size="1" w="16" lines={1} />
                {/* <Skeleton.Text size="1" w="10" lines={1} /> */}
              </VStack>
            </Flex>
            <Skeleton h="5" w="1" mr="3" rounded="lg" />
          </HStack>
          <Skeleton h="56" mb="3" />
          <HStack alignItems="center" space="2" mb="3">
            <Skeleton size="5" rounded="full" />
            <Skeleton size="5" rounded="full" ml="2" />
            {/* <Skeleton h="1" w="4" mr="3" /> */}
          </HStack>
          {/* <Skeleton.Text size="1" w="1/2" lines={1} mb="3" /> */}
          <Skeleton.Text size="1" w="1/2" lines={2} />
          <Skeleton.Text size="1" w="10" mt="4" lines={1} mb="3" />
        </Box>
      </VStack>
    </Center>
  )
}

export default FeedSkeleton
