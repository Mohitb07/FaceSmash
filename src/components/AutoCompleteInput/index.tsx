import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react'
import {Animated, Dimensions} from 'react-native'

import {View, Text} from 'native-base'
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'
import firestore from '@react-native-firebase/firestore'

import {COLORS, USERS_COLLECTION, USERS_LIMIT} from '@/constants'
import {CloseIcon, SearchIcon} from '@/SVG'
import {IUserDetail} from '@/interface'

type AutoCompleteInputProps = {
  marginAnimation: Animated.Value
  setFoundUsers: Dispatch<SetStateAction<IUserDetail[] | null>>
  currentInputValue: MutableRefObject<string>
}
type SuggestionList = {
  id: string
  title: string | null
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  marginAnimation,
  setFoundUsers,
  currentInputValue,
}) => {
  const [suggestionsList, setSuggestionsList] =
    useState<Array<SuggestionList> | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isFocus, setIsFocus] = useState(false)
  const currentText = useRef('')

  const userRef = (query: string) => {
    return firestore()
      .collection(USERS_COLLECTION)
      .where('qusername', '>=', query)
      .where('qusername', '<=', query + '\uf8ff')
      .limit(USERS_LIMIT)
  }

  const getUsersDetails = (query: string) => {
    if (query) {
      query = query.trim().toLowerCase()
      currentInputValue.current = query
      try {
        userRef(query)
          .get()
          .then(
            snapshot => {
              const usersList: Array<IUserDetail> = snapshot.docs.map(d => ({
                ...(d.data() as IUserDetail),
              }))
              setFoundUsers(usersList)
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

  const getSuggestions = (query: string) => {
    currentText.current = query
    if (query) {
      query = query.trim().toLowerCase()
      Animated.timing(marginAnimation, {
        toValue: (Dimensions.get('window').height * 0.4) / 2,
        duration: 300,
        useNativeDriver: true,
      }).start()
      try {
        userRef(query)
          .get()
          .then(
            snapshot => {
              const suggList: Array<SuggestionList> = snapshot.docs.map(d => ({
                id: d.data().uid,
                title: d.data().username,
              }))
              console.log('list', suggList)
              setSuggestionsList(suggList)
            },
            error => {
              console.log('Error getSuggestions', error)
            },
          )
      } catch (e) {
        console.log('errorStyle', e)
      }
    } else {
      Animated.timing(marginAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
      setSuggestionsList(null)
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

  const onSelectItem = (item: SuggestionList) => {
    if (item.title) {
      setSelectedItem(item.id)
      onSelectClear()
      getUsersDetails(item.title)
    }
  }
  const onSubmitHandler = useCallback((text: string) => {
    if (text) {
      Animated.timing(marginAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
      getUsersDetails(text)
      setSuggestionsList(null)
      setIsFocus(false)
      setSelectedItem(text)
    }
  }, [])

  const ItemSeparatorComponent = useMemo(() => {
    return () => <View height="0" width="0" />
  }, [])

  const renderItems = (item: SuggestionList) => (
    <View flexDirection="row" alignItems="center" px={15} py={2}>
      <SearchIcon />
      <Text color="white" ml={2}>
        {item.title}
      </Text>
    </View>
  )

  return (
    <AutocompleteDropdown
      inputHeight={40}
      dataSet={suggestionsList!}
      onChangeText={getSuggestions}
      onSelectItem={(item: SuggestionList) => item && onSelectItem(item)}
      closeOnSubmit={true}
      onSubmit={({nativeEvent: {text}}) => onSubmitHandler(text)}
      debounce={600}
      suggestionsListMaxHeight={(Dimensions.get('window').height * 0.4) / 2}
      onClear={onClearPress}
      useFilter={false}
      textInputProps={{
        placeholder: 'Search',
        placeholderTextColor: COLORS.gray,
        autoCorrect: false,
        autoCapitalize: 'none',
        style: {
          borderRadius: 25,
          backgroundColor: COLORS.gray3,
          color: COLORS.white2,
          paddingLeft: 18,
          fontSize: 14,
        },
      }}
      rightButtonsContainerStyle={{
        right: 8,
        height: 30,
        alignSelf: 'center',
      }}
      inputContainerStyle={{
        backgroundColor: COLORS.gray3,
        borderRadius: 25,
      }}
      suggestionsListContainerStyle={{
        backgroundColor: COLORS.mainBackground,
        marginVertical: 10,
      }}
      containerStyle={{
        flexGrow: 1,
        flexShrink: 1,
        padding: 10,
        marginLeft: 5,
      }}
      onFocus={inputFocus}
      renderItem={renderItems}
      ClearIconComponent={<CloseIcon />}
      showChevron={false}
      showClear={(isFocus || Boolean(selectedItem)) && true}
      closeOnBlur={false}
      ItemSeparatorComponent={<ItemSeparatorComponent />}
      EmptyResultComponent={
        <View alignSelf="center" mt="10">
          <Text color={COLORS.gray2} fontSize="md">
            No result for {currentText.current}
          </Text>
        </View>
      }
    />
  )
}
export default AutoCompleteInput
