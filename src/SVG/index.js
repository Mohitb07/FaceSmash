import * as React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Mask,
  Path,
  Rect,
  Desc,
  LinearGradient,
  Stop,
  Line,
} from 'react-native-svg';
import {View} from 'react-native';

export const SearchIcon = () => {
  return (
    <View>
      <Svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M15.0258 13.8475L18.595 17.4159L17.4158 18.595L13.8475 15.0259C12.5198 16.0902 10.8683 16.6691 9.16666 16.6667C5.02666 16.6667 1.66666 13.3067 1.66666 9.16669C1.66666 5.02669 5.02666 1.66669 9.16666 1.66669C13.3067 1.66669 16.6667 5.02669 16.6667 9.16669C16.6691 10.8684 16.0902 12.5198 15.0258 13.8475ZM13.3542 13.2292C14.4118 12.1416 15.0024 10.6837 15 9.16669C15 5.94335 12.3892 3.33335 9.16666 3.33335C5.94333 3.33335 3.33333 5.94335 3.33333 9.16669C3.33333 12.3892 5.94333 15 9.16666 15C10.6837 15.0024 12.1416 14.4118 13.2292 13.3542L13.3542 13.2292Z"
          fill="#9CA7B9"
        />
      </Svg>
    </View>
  );
};

export const HeartIcon = () => {
  return (
    <View style={{marginTop: 3}}>
      <Svg
        width="27"
        height="27"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#9CA7B9">
        <Path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
      </Svg>
    </View>
  );
};

export const CommentIcon = style => {
  return (
    <View style={{marginHorizontal: 5}}>
      <Svg
        fill="#9CA7B9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="26"
        height="26">
        <Path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z" />
      </Svg>
    </View>
  );
};

export const UserIcon = style => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="26"
      height="26"
      viewBox="0 0 48 48"
      style=" fill:#000000;">
      <LinearGradient
        id="3IxHEenaxLeaX4VRp_MLIa_fU8Y38tDYs9B_gr1"
        x1="7.454"
        x2="32.757"
        y1="12.078"
        y2="37.381"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#0077d2"></Stop>
        <Stop offset="1" stopColor="#0b59a2"></Stop>
      </LinearGradient>
      <Path
        fill="url(#3IxHEenaxLeaX4VRp_MLIa_fU8Y38tDYs9B_gr1)"
        d="M33.226,12.408C29.984,9.258,25.567,7.31,20.69,7.31c-9.94,0-18,8.06-18,18s8.06,18,18,18	c4.877,0,9.294-1.948,12.536-5.098c0.019-0.018,0.04-0.03,0.059-0.048l0.059-0.059c0.048-0.047,0.095-0.094,0.142-0.142	l11.239-11.239c0.781-0.781,0.781-2.047,0-2.828L33.486,12.657c-0.047-0.048-0.094-0.095-0.142-0.142l-0.059-0.059	C33.266,12.437,33.244,12.425,33.226,12.408z"></Path>
      <Circle cx="20" cy="19" r="5" opacity=".05"></Circle>
      <Circle cx="20" cy="19" r="4.5" opacity=".07"></Circle>
      <LinearGradient
        id="3IxHEenaxLeaX4VRp_MLIb_fU8Y38tDYs9B_gr2"
        x1="17.286"
        x2="22.867"
        y1="883.714"
        y2="878.133"
        gradientTransform="matrix(1 0 0 -1 0 900)"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#75daff"></Stop>
        <Stop offset="1" stopColor="#1ea2e4"></Stop>
      </LinearGradient>
      <Circle
        cx="20"
        cy="19"
        r="4"
        fill="url(#3IxHEenaxLeaX4VRp_MLIb_fU8Y38tDYs9B_gr2)"></Circle>
      <Path
        d="M13.875,35C12.841,35,12,34.159,12,33.125V32c0-4.411,3.589-8,8-8	s8,3.589,8,8v1.125C28,34.159,27.159,35,26.125,35H13.875z"
        opacity=".05"></Path>
      <Path
        d="M13.875,34.5c-0.758,0-1.375-0.617-1.375-1.375V32	c0-4.136,3.364-7.5,7.5-7.5s7.5,3.364,7.5,7.5v1.125c0,0.758-0.617,1.375-1.375,1.375H13.875z"
        opacity=".07"></Path>
      <LinearGradient
        id="3IxHEenaxLeaX4VRp_MLIc_fU8Y38tDYs9B_gr3"
        x1="20"
        x2="20"
        y1="875.186"
        y2="865.925"
        gradientTransform="matrix(1 0 0 -1 0 900)"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#75daff"></Stop>
        <Stop offset="1" stopColor="#1ea2e4"></Stop>
      </LinearGradient>
      <Path
        fill="url(#3IxHEenaxLeaX4VRp_MLIc_fU8Y38tDYs9B_gr3)"
        d="M27,32c0-3.866-3.134-7-7-7s-7,3.134-7,7c0,0.605,0,1.125,0,1.125	C13,33.608,13.392,34,13.875,34h12.25C26.608,34,27,33.608,27,33.125C27,33.125,27,32.605,27,32z"></Path>
    </Svg>
  );
};

export const LockIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="26"
      height="26"
      viewBox="0 0 48 48"
      style=" fill:#000000;">
      <LinearGradient
        id="pa6zoXJpYvnL2wKDvc1Jaa_aOIgAaBKsm36_gr1"
        x1="7.454"
        x2="32.757"
        y1="12.078"
        y2="37.381"
        gradientUnits="userSpaceOnUse">
        <Stop offset="1" stopColor="#0b59a2"></Stop>
        <Stop offset="0" stopColor="#0077d2"></Stop>
      </LinearGradient>
      <Path
        fill="url(#pa6zoXJpYvnL2wKDvc1Jaa_aOIgAaBKsm36_gr1)"
        d="M33.226,12.408C29.984,9.258,25.567,7.31,20.69,7.31c-9.94,0-18,8.06-18,18s8.06,18,18,18	c4.877,0,9.294-1.948,12.536-5.098c0.019-0.018,0.04-0.03,0.059-0.048l0.059-0.059c0.048-0.047,0.095-0.094,0.142-0.142	l11.239-11.239c0.781-0.781,0.781-2.047,0-2.828L33.486,12.657c-0.047-0.048-0.094-0.095-0.142-0.142l-0.059-0.059	C33.266,12.437,33.244,12.425,33.226,12.408z"></Path>
      <Path
        d="M14,34.811c-1.103,0-2-0.897-2-2v-10c0-1.103,0.897-2,2-2c0-3.859,3.14-7,7-7s7,3.141,7,7	c1.103,0,2,0.897,2,2v10c0,1.103-0.897,2-2,2H14z M24,20.811c0-1.654-1.346-3-3-3s-3,1.346-3,3H24z"
        opacity=".05"></Path>
      <Path
        d="M14,34.311c-0.827,0-1.5-0.673-1.5-1.5v-10c0-0.827,0.673-1.5,1.5-1.5h0.5v-0.5	c0-3.584,2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5v0.5H28c0.827,0,1.5,0.673,1.5,1.5v10c0,0.827-0.673,1.5-1.5,1.5H14z M24.5,21.311	v-0.5c0-1.93-1.57-3.5-3.5-3.5s-3.5,1.57-3.5,3.5v0.5H24.5z"
        opacity=".07"></Path>
      <LinearGradient
        id="pa6zoXJpYvnL2wKDvc1Jab_aOIgAaBKsm36_gr2"
        x1="21"
        x2="21"
        y1="22.819"
        y2="15.603"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#92a3b0"></Stop>
        <Stop offset=".099" stopColor="#a3b5c4"></Stop>
        <Stop offset=".174" stopColor="#aec2d1"></Stop>
        <Stop offset=".276" stopColor="#b2c6d6"></Stop>
      </LinearGradient>
      <Path
        fill="url(#pa6zoXJpYvnL2wKDvc1Jab_aOIgAaBKsm36_gr2)"
        d="M27,23.81h-2v-3c0-2.206-1.794-4-4-4s-4,1.794-4,4v3h-2v-3c0-3.309,2.691-6,6-6s6,2.691,6,6	V23.81z"></Path>
      <Path
        fill="#c48c00"
        d="M28,33.81H14c-0.552,0-1-0.448-1-1v-2h16v2C29,33.362,28.552,33.81,28,33.81z"></Path>
      <Rect width="16" height="3" x="13" y="27.81" fill="#e3a600"></Rect>
      <Rect width="16" height="3" x="13" y="24.81" fill="#edbe00"></Rect>
      <Path
        fill="#fad500"
        d="M29,24.81H13v-2c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1V24.81z"></Path>
      <LinearGradient
        id="pa6zoXJpYvnL2wKDvc1Jac_aOIgAaBKsm36_gr3"
        x1="21"
        x2="21"
        y1="-699.197"
        y2="-692.766"
        gradientTransform="matrix(1 0 0 -1 0 -668)"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#4b4b4b"></Stop>
        <Stop offset="1" stopColor="#3b3b3b"></Stop>
      </LinearGradient>
      <Path
        fill="url(#pa6zoXJpYvnL2wKDvc1Jac_aOIgAaBKsm36_gr3)"
        d="M23,26.81c0-1.105-0.895-2-2-2s-2,0.895-2,2c0,0.839,0.518,1.555,1.25,1.852v1.398	c0,0.414,0.336,0.75,0.75,0.75s0.75-0.336,0.75-0.75v-1.398C22.482,28.365,23,27.649,23,26.81z"></Path>
    </Svg>
  );
};

export const FacebookIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="26px"
      height="26px">
      <LinearGradient
        id="Ld6sqrtcxMyckEl6xeDdMa"
        x1="9.993"
        x2="40.615"
        y1="9.993"
        y2="40.615"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#2aa4f4" />
        <Stop offset="1" stopColor="#007ad9" />
      </LinearGradient>
      <Path
        fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
      />
      <Path
        fill="#fff"
        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
      />
    </Svg>
  );
};

export const GoogleIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="26px"
      height="26px">
      <Path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <Path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <Path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <Path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </Svg>
  );
};
