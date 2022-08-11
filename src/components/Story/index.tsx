import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {Avatar, Text, View} from 'native-base'

import {COLORS} from '../../constants'
import {AddIcon} from '../../SVG'

type Props = {
  uri: string
  username?: string
  noRing?: boolean
}

const Story = ({uri, username, noRing = false}: Props) => {
  return (
    <TouchableOpacity style={styles.story}>
      {noRing ? (
        <View
          padding="5"
          backgroundColor={COLORS.cardBackground}
          rounded="full">
          <AddIcon />
        </View>
      ) : (
        <Avatar
          size="lg"
          borderColor={COLORS.primary}
          borderWidth={`${noRing ? '0' : '2'}`}
          padding="0.5"
          bgColor={COLORS.mainBackground}
          source={{
            uri,
          }}
        />
      )}
      <Text fontFamily="Lato-Regular">{username ?? 'Your Story'}</Text>
    </TouchableOpacity>
  )
}

export default Story

const styles = StyleSheet.create({
  story: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})