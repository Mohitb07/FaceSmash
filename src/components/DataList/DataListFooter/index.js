import {Text, View} from 'native-base'
import React from 'react'
import FeedSkeleton from '../../FeedSkeleton'

const DataListFooter = ({dataList, loading}) => {
  return (
    dataList.length > 0 && (
      <View paddingY="5">
        {loading ? (
          <FeedSkeleton />
        ) : (
          <Text textAlign="center" color="gray.500">
            No More post
          </Text>
        )}
      </View>
    )
  )
}

export default DataListFooter
