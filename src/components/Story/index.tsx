import React from 'react'
import {StyleSheet, TextStyle, TouchableOpacity} from 'react-native'

import {Avatar, Text, View} from 'native-base'
import {ThemeComponentSizeType} from 'native-base/lib/typescript/components/types'

import {COLORS} from '../../constants'
import {AddIcon} from '../../SVG'

type Props = {
  uri: string | undefined
  username?: string
  noRing?: boolean
  textStyle?: TextStyle
  containerStyle?: TextStyle
  size?: ThemeComponentSizeType<'Avatar'>
}

const Story = ({
  uri,
  username,
  noRing = false,
  textStyle,
  size = 'lg',
  containerStyle,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.story, containerStyle]}>
      {noRing ? (
        <View
          padding="5"
          backgroundColor={COLORS.cardBackground}
          rounded="full">
          <AddIcon />
        </View>
      ) : (
        <View>
          <Avatar
            size={size}
            borderColor={COLORS.primary}
            borderWidth={`${noRing ? '0' : '2'}`}
            padding="0.5"
            bgColor={COLORS.mainBackground}
            source={{
              uri,
            }}
          />
        </View>
      )}
      <Text
        style={textStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
        fontFamily="Lato-Regular">
        {username ?? 'Your Story'}
      </Text>
    </TouchableOpacity>
  )
}

export default Story

const styles = StyleSheet.create({
  story: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginLeft: 15,
    textAlign: 'center',
  },
})
