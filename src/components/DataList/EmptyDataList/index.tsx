import React from 'react'

import {Text, View} from 'native-base'

import {COLORS} from '../../../constants'
import FeedSkeleton from '../../FeedSkeleton'
// import FeedSkeleton from '../../FeedSkeleton'
import {DocumentNotFound} from '../../../SVG'

const EmptyList = ({loading}: {loading: boolean}) => {
  return loading ? (
    <>
      <FeedSkeleton />
    </>
  ) : (
    <View marginY="1/5" justifyContent="center" alignItems="center">
      <DocumentNotFound height="100px" width="100px" />
      <Text textAlign="center" color={COLORS.white} fontSize={20} marginTop={5}>
        Not Enough Posts
      </Text>
    </View>
  )
}

export default React.memo(EmptyList)
