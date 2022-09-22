import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from 'react'
import {View, Text} from 'native-base'
import {Animated, Dimensions} from 'react-native'
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'
import {COLORS, USERS_LIMIT} from '../../constants'
import {CloseIcon, SearchIcon} from '../../SVG'
import firestore from '@react-native-firebase/firestore'
import {IUserDetail} from '../../interface'

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

  const getUsersDetails = (query: string) => {
    if (query) {
      query = query.trim().toLowerCase()
      currentInputValue.current = query
      try {
        firestore()
          .collection('Users')
          .where('qusername', '>=', query)
          .where('qusername', '<=', query + '\uf8ff')
          .limit(USERS_LIMIT)
          .get()
          .then(
            snapshot => {
              const usersList: Array<IUserDetail> = snapshot.docs.map(d => ({
                createdAt: '',
                email: '',
                followers: [],
                followings: [],
                lastSignIn: '',
                profilePic: '',
                qusername: '',
                uid: '',
                username: '',
                ...d.data(),
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
        firestore()
          .collection('Users')
          .where('qusername', '>=', query)
          .where('qusername', '<=', query + '\uf8ff')
          .limit(USERS_LIMIT)
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
    return () => (
      <View
        style={{height: 1, width: '100%', backgroundColor: 'transparent'}}
      />
    )
  }, [])

  return (
    <AutocompleteDropdown
      inputHeight={40}
      // @ts-ignore
      dataSet={suggestionsList}
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
          backgroundColor: '#383b42',
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
        backgroundColor: '#383b42',
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
