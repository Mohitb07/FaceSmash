import React from 'react'

import {Text} from 'native-base'

import {COLORS} from '../../../../constants'
import FeedSkeleton from '../../../FeedSkeleton'

const EmptyList = ({loading}) => {
  return loading ? (
    <>
      <FeedSkeleton />
    </>
  ) : (
    <Text textAlign="center" color={COLORS.white} fontSize={20} marginTop={20}>
      Not Enough Posts
    </Text>
  )
}

export default React.memo(EmptyList)
