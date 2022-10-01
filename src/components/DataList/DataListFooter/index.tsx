import React from 'react'

import {Text, View} from 'native-base'

import {IPost} from '@/interface'
import FeedSkeleton from '@/components/FeedSkeleton'

const DataListFooter = ({
  dataList = [],
  loading = false,
}: {
  dataList: Array<IPost>
  loading: boolean
}) => {
  let content
  if (dataList.length > 0 && loading) {
    content = <FeedSkeleton />
  } else if (dataList.length > 0 && !loading) {
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
