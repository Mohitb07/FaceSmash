import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React, {useState, useRef, useCallback, useMemo} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import {COLORS} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'
import {BackIcon, CloseIcon, SearchIcon, TrendingIcon} from '../../SVG'
import Story from '../../components/Story'
import {dummyStoryData} from '../../components/Header/Home'
import {FlatList} from 'native-base'

type SearchUserScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchUser'
>

const SearchUser: React.FC<SearchUserScreenNavigationProp> = ({navigation}) => {
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isFocus, setIsFocus] = useState(false)
  const [marginAnimation, setMarginAnimation] = useState(new Animated.Value(0))

  const getSuggestions = (value: string) => {
    console.log(value)
  }
  const onClearPress = useCallback(() => {
    Animated.timing(marginAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setSuggestionsList(null)
    setIsFocus(false)
  }, [])

  const inputFocus = () => {
    setIsFocus(true)
    Animated.timing(marginAnimation, {
      toValue: (Dimensions.get('window').height * 0.4) / 2,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const ItemSeparatorComponent = useMemo(() => {
    return () => (
      <View
        style={{height: 1, width: '100%', backgroundColor: 'transparent'}}
      />
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <AutocompleteDropdown
          dataSet={[
            {id: '1', title: 'Alpha'},
            {id: '2', title: 'Beta'},
            {id: '4', title: 'Gfadfamma'},
            {id: '5', title: 'fadsfGamma'},
          ]}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            if (item) {
              setSelectedItem(item.id)
              onClearPress()
            }
          }}
          debounce={600}
          suggestionsListMaxHeight={(Dimensions.get('window').height * 0.4) / 2}
          onClear={onClearPress}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Search',
            placeholderTextColor: COLORS.gray,
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: COLORS.white2,
              paddingLeft: 18,
              fontSize: 18,
            },
          }}
          onFocus={inputFocus}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: 'transparent',
            marginVertical: 10,
            // marginHorizontal: -35,
          }}
          containerStyle={{
            flexGrow: 1,
            flexShrink: 1,
            padding: 10,
            marginLeft: 5,
          }}
          renderItem={(item, text) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}>
              <SearchIcon />
              <Text
                style={{
                  color: '#fff',
                  marginLeft: 10,
                }}>
                {item.title}
              </Text>
            </View>
          )}
          ClearIconComponent={<CloseIcon />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          ItemSeparatorComponent={<ItemSeparatorComponent />}
          EmptyResultComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: (Dimensions.get('window').height * 0.4) / 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                No result found
              </Text>
            </View>
          }
        />
      </View>

      <Animated.View
        style={[
          styles.recommendedUser,
          {
            translateY: marginAnimation,
          },
        ]}>
        <View style={styles.recommendedTextContainer}>
          <TrendingIcon fill="#fff" />
          <Text style={styles.recommendedUserText}>Recommended User</Text>
        </View>
        <FlatList
          horizontal
          data={dummyStoryData}
          renderItem={({item}) => (
            <Story key={item.id} uri={item.uri} username={item.username} />
          )}
        />
      </Animated.View>
    </View>
  )
}
export default SearchUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  recommendedUser: {
    paddingHorizontal: 15,
  },
  recommendedTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedUserText: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
    fontFamily: 'Lato-Bold',
    marginLeft: 10,
  },
})
