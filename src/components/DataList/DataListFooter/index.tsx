import React from 'react'

import {Text, View} from 'native-base'

import FeedSkeleton from '@/components/FeedSkeleton'

type DataListFooterProps = {
  dataListSize: number
  isLoading: boolean
  hasNext: boolean
}

const DataListFooter = ({
  dataListSize = 0,
  isLoading = false,
  hasNext,
}: DataListFooterProps) => {
  let content
  if (dataListSize > 0 && isLoading) {
    content = <FeedSkeleton />
  } else if (dataListSize > 0 && !isLoading && !hasNext) {
    content = (
      <Text textAlign="center" color="gray.500">
        No More post
      </Text>
    )
  } else {
    return null
  }
  return <View paddingY="5">{content}</View>
}

export default React.memo(DataListFooter)
