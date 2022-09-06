import React, {useCallback, useMemo, useState, useEffect, useRef} from 'react'
import {View, Text} from 'native-base'
import {Animated, Dimensions} from 'react-native'
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'
import {COLORS} from '../../constants'
import {CloseIcon, SearchIcon} from '../../SVG'
import firestore from '@react-native-firebase/firestore'

type AutoCompleteInputProps = {
  marginAnimation: Animated.Value
}
type SuggestionList = {
  id: string
  title: string
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  marginAnimation,
}) => {
  const [suggestionsList, setSuggestionsList] =
    useState<Array<SuggestionList> | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isFocus, setIsFocus] = useState(false)
  const currentText = useRef('')
  const getSuggestions = (value: string) => {
    currentText.current = value
    if (value) {
      Animated.timing(marginAnimation, {
        toValue: (Dimensions.get('window').height * 0.4) / 2,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(marginAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
    console.log(value)
    console.log('firing firestore')
    setSuggestionsList(null)
    if (value) {
      try {
        firestore()
          .collection('Users')
          .where('qusername', '>=', value)
          .where('qusername', '<=', value + '\uf8ff')
          .limit(5)
          .get()
          .then(
            snapshot => {
              const list: Array<SuggestionList> = []
              snapshot.docs.map(d => {
                list.push({
                  id: d.data().uid,
                  title: d.data().username,
                })
              })
              console.log('list', list)
              setSuggestionsList(list)
            },
            error => {
              console.log('Error getSuggestions', error)
            },
          )
      } catch (e) {
        console.log('errorStyle', e)
      }
    }
  }
  const onClearPress = useCallback(() => {
    Animated.timing(marginAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setSelectedItem(null)
    setSuggestionsList(null)
    setIsFocus(false)
  }, [])
  const onSelectClear = useCallback((text?: string) => {
    console.log('onSelectClear called', text)
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
  }

  const ItemSeparatorComponent = useMemo(() => {
    return () => (
      <View
        style={{height: 1, width: '100%', backgroundColor: 'transparent'}}
      />
    )
  }, [])

  const onSubmitHandler = useCallback((text: string) => {
    console.log('onSelectClear called', text)
    Animated.timing(marginAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
    setSuggestionsList(null)
    setIsFocus(false)
    setSelectedItem(text)
  }, [])

  console.log('selectedItem', selectedItem)
  console.log('suggestionList', suggestionsList)

  // const onOpenSuggestionsList = useCallback(isOpened => !isOpened, [])

  return (
    <AutocompleteDropdown
      inputHeight={40}
      // onOpenSuggestionsList={onOpenSuggestionsList}
      // @ts-ignore
      dataSet={suggestionsList}
      onChangeText={getSuggestions}
      onSelectItem={item => {
        if (item) {
          setSelectedItem(item.id)
          onSelectClear()
        }
      }}
      closeOnSubmit={true}
      onSubmit={({nativeEvent: {text}}) => onSubmitHandler(text)}
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
          fontSize: 14,
        },
      }}
      // onFocus={inputFocus}
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
      }}
      containerStyle={{
        flexGrow: 1,
        flexShrink: 1,
        padding: 10,
        marginLeft: 5,
      }}
      onFocus={inputFocus}
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
      showChevron={false}
      showClear={(isFocus || Boolean(selectedItem)) && true}
      closeOnBlur={false}
      ItemSeparatorComponent={<ItemSeparatorComponent />}
      EmptyResultComponent={
        <View alignSelf="center" mt="10">
          <Text color="white" fontSize="md">
            No result for {currentText.current}
          </Text>
        </View>
      }
    />
  )
}
export default AutoCompleteInput
