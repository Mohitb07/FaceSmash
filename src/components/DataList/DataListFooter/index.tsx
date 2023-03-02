import React from 'react'

import {Text, View} from 'native-base'

import {IPost} from '@/interface'
import FeedSkeleton from '@/components/FeedSkeleton'

type DataListFooterProps = {
  dataList: IPost[]
  isLoading: boolean
  hasNext: boolean
}

const DataListFooter = ({
  dataList = [],
  isLoading = false,
  hasNext,
}: DataListFooterProps) => {
  let content
  if (dataList.length > 0 && isLoading) {
    content = <FeedSkeleton />
  } else if (dataList.length > 0 && !isLoading && !hasNext) {
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
