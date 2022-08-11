import React from 'react'

import {Text, View} from 'native-base'

import {COLORS} from '../../../../constants'
import {DocumentNotFound} from '../../../../SVG'
import FeedSkeleton from '../../../FeedSkeleton'

const EmptyList = ({loading}) => {
  return loading ? (
    <>
      <FeedSkeleton />
    </>
  ) : (
    <View marginY="1/5" justifyContent="center" alignItems="center">
      <DocumentNotFound height="100px" width="100px" />
      <Text textAlign="center" color={COLORS.white} fontSize={20} marginTop={3}>
        Not Enough Posts
      </Text>
    </View>
  )
}

export default React.memo(EmptyList)
