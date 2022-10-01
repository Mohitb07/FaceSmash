import {TextStyle} from 'react-native'
import 'react-native-svg'
declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string
    xmlnsXlink?: string
    height?: string
    width?: string
    fill?: string
    style?: TextStyle
  }
}
