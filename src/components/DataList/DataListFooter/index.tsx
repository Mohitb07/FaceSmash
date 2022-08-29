import {Text, View} from 'native-base'
import React from 'react'
import FeedSkeleton from '../../FeedSkeleton'

import {IPost} from '../../../atoms/postAtom'

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
