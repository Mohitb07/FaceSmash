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
  Polygon,
  Ellipse,
  Polyline,
} from 'react-native-svg';
import {View} from 'react-native';
import {COLORS} from '../constants';

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

// export const HeartOutlinIcon = () => {
//   return (
//     <View style={{marginTop: 3}}>
//       <Svg
//         width="27"
//         height="27"
//         xmlns="http://www.w3.org/2000/svg"
//         fillRule="nonzero"
//         clipRule="nonzero"
//         fill="red">
//         <Path
//           d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
//           fill="red"
//         />
//       </Svg>
//     </View>
//   );
// };

export const HeartOutlinIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3783 5.88622C9.66902 4.10486 6.79049 4.0794 4.92308 5.90387C4.91717 5.90965 4.91116 5.91534 4.90506 5.92092C3.09331 7.58038 3.06654 10.3577 4.92308 12.1716L4.92796 12.1763L11.9374 19.1469L19.0769 12.1716C19.0828 12.1658 19.0888 12.1601 19.0949 12.1545C20.9067 10.495 20.9335 7.71772 19.0769 5.90387C17.2195 4.08919 14.3268 4.08919 12.4694 5.90387C12.3227 6.04722 12.125 6.12596 11.9202 6.12264C11.7154 6.11933 11.5204 6.03424 11.3783 5.88622ZM11.9465 4.31813C9.59468 2.40387 6.12292 2.58601 3.85838 4.79012C1.36802 7.08049 1.39686 10.8778 3.84702 13.2742C3.84785 13.275 3.84869 13.2759 3.84952 13.2767L11.391 20.7763C11.689 21.0727 12.1688 21.0748 12.4694 20.7811L20.1419 13.2851C22.6328 10.9939 22.603 7.19491 20.1505 4.79876C17.8724 2.57305 14.397 2.41284 11.9465 4.31813Z"
      fill="#fff"
    />
  </Svg>
);

export const HeartFilledIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M22 9.07503C22 10.7199 21.2857 12.1591 20.1633 13.2899L12.5102 20.7944C12.3061 20.8972 12.2041 21 12 21C11.7959 21 11.5918 20.8972 11.4898 20.7944L3.83673 13.1871C2.71429 12.0563 2 10.5142 2 8.86943C2 7.3274 2.71429 5.88818 3.83673 4.75737C5.06122 3.62655 6.59184 2.90694 8.22449 3.00974C9.55102 3.00974 10.7755 3.52375 11.7959 4.34616C14.2449 2.39293 17.7143 2.59853 19.9592 4.86017C21.2857 5.88818 22 7.4302 22 9.07503Z"
      fill="red"
    />
  </Svg>
);

export const CommentIcon = props => {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      id="magicoon-Filled"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Defs></Defs>
      <G id="comments-Filled">
        <Path
          id="comments-Filled-2"
          data-name="comments-Filled"
          className="cls-1"
          d="M21.5,11V21a.489.489,0,0,1-.31.46.433.433,0,0,1-.19.04.508.508,0,0,1-.36-.15L18.83,19.5H10A3.5,3.5,0,0,1,6.5,16H14a5,5,0,0,0,5-5V7.65A3.507,3.507,0,0,1,21.5,11Zm-4,0V6A3.5,3.5,0,0,0,14,2.5H6A3.5,3.5,0,0,0,2.5,6V16a.489.489,0,0,0,.31.46A.433.433,0,0,0,3,16.5a.508.508,0,0,0,.36-.15L5.17,14.5H14A3.5,3.5,0,0,0,17.5,11Z"
          fill="#fff"
        />
      </G>
    </Svg>
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
        <Stop offset="0.099" stopColor="#a3b5c4"></Stop>
        <Stop offset="0.174" stopColor="#aec2d1"></Stop>
        <Stop offset="0.276" stopColor="#b2c6d6"></Stop>
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

export const VerificationIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <G
      id="web-app"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="check-verified" fill={COLORS.neon}>
        <Path
          d="M4.25203497,14 L4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 L4.25203497,10 C4.44096432,9.26595802 4.73145639,8.57268879 5.10763818,7.9360653 L4.92893219,7.75735931 C4.1478836,6.97631073 4.1478836,5.70998077 4.92893219,4.92893219 C5.70998077,4.1478836 6.97631073,4.1478836 7.75735931,4.92893219 L7.9360653,5.10763818 C8.57268879,4.73145639 9.26595802,4.44096432 10,4.25203497 L10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,4.25203497 C14.734042,4.44096432 15.4273112,4.73145639 16.0639347,5.10763818 L16.2426407,4.92893219 C17.0236893,4.1478836 18.2900192,4.1478836 19.0710678,4.92893219 C19.8521164,5.70998077 19.8521164,6.97631073 19.0710678,7.75735931 L18.8923618,7.9360653 C19.2685436,8.57268879 19.5590357,9.26595802 19.747965,10 L20,10 C21.1045695,10 22,10.8954305 22,12 C22,13.1045695 21.1045695,14 20,14 L19.747965,14 C19.5590357,14.734042 19.2685436,15.4273112 18.8923618,16.0639347 L19.0710678,16.2426407 C19.8521164,17.0236893 19.8521164,18.2900192 19.0710678,19.0710678 C18.2900192,19.8521164 17.0236893,19.8521164 16.2426407,19.0710678 L16.0639347,18.8923618 C15.4273112,19.2685436 14.734042,19.5590357 14,19.747965 L14,20 C14,21.1045695 13.1045695,22 12,22 C10.8954305,22 10,21.1045695 10,20 L10,19.747965 C9.26595802,19.5590357 8.57268879,19.2685436 7.9360653,18.8923618 L7.75735931,19.0710678 C6.97631073,19.8521164 5.70998077,19.8521164 4.92893219,19.0710678 C4.1478836,18.2900192 4.1478836,17.0236893 4.92893219,16.2426407 L5.10763818,16.0639347 C4.73145639,15.4273112 4.44096432,14.734042 4.25203497,14 Z M9,10 L7,12 L11,16 L17,10 L15,8 L11,12 L9,10 Z"
          id="Shape"
        />
      </G>
    </G>
  </Svg>
);

export const GearIcon = props => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm-1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12 1c-.268 0-.534.01-.797.028-.763.055-1.345.617-1.512 1.304l-.352 1.45c-.02.078-.09.172-.225.22a8.45 8.45 0 00-.728.303c-.13.06-.246.044-.315.002l-1.274-.776c-.604-.368-1.412-.354-1.99.147-.403.348-.78.726-1.129 1.128-.5.579-.515 1.387-.147 1.99l.776 1.275c.042.069.059.185-.002.315-.112.237-.213.48-.302.728-.05.135-.143.206-.221.225l-1.45.352c-.687.167-1.249.749-1.304 1.512a11.149 11.149 0 000 1.594c.055.763.617 1.345 1.304 1.512l1.45.352c.078.02.172.09.22.225.09.248.191.491.303.729.06.129.044.245.002.314l-.776 1.274c-.368.604-.354 1.412.147 1.99.348.403.726.78 1.128 1.129.579.5 1.387.515 1.99.147l1.275-.776c.069-.042.185-.059.315.002.237.112.48.213.728.302.135.05.206.143.225.221l.352 1.45c.167.687.749 1.249 1.512 1.303a11.125 11.125 0 001.594 0c.763-.054 1.345-.616 1.512-1.303l.352-1.45c.02-.078.09-.172.225-.22.248-.09.491-.191.729-.303.129-.06.245-.044.314-.002l1.274.776c.604.368 1.412.354 1.99-.147.403-.348.78-.726 1.129-1.128.5-.579.515-1.387.147-1.99l-.776-1.275c-.042-.069-.059-.185.002-.315.112-.237.213-.48.302-.728.05-.135.143-.206.221-.225l1.45-.352c.687-.167 1.249-.749 1.303-1.512a11.125 11.125 0 000-1.594c-.054-.763-.616-1.345-1.303-1.512l-1.45-.352c-.078-.02-.172-.09-.22-.225a8.469 8.469 0 00-.303-.728c-.06-.13-.044-.246-.002-.315l.776-1.274c.368-.604.354-1.412-.147-1.99-.348-.403-.726-.78-1.128-1.129-.579-.5-1.387-.515-1.99-.147l-1.275.776c-.069.042-.185.059-.315-.002a8.465 8.465 0 00-.728-.302c-.135-.05-.206-.143-.225-.221l-.352-1.45c-.167-.687-.749-1.249-1.512-1.304A11.149 11.149 0 0012 1zm-.69 1.525a9.648 9.648 0 011.38 0c.055.004.135.05.162.16l.351 1.45c.153.628.626 1.08 1.173 1.278.205.074.405.157.6.249a1.832 1.832 0 001.733-.074l1.275-.776c.097-.06.186-.036.228 0 .348.302.674.628.976.976.036.042.06.13 0 .228l-.776 1.274a1.832 1.832 0 00-.074 1.734c.092.195.175.395.248.6.198.547.652 1.02 1.278 1.172l1.45.353c.111.026.157.106.161.161a9.653 9.653 0 010 1.38c-.004.055-.05.135-.16.162l-1.45.351a1.833 1.833 0 00-1.278 1.173 6.926 6.926 0 01-.25.6 1.832 1.832 0 00.075 1.733l.776 1.275c.06.097.036.186 0 .228a9.555 9.555 0 01-.976.976c-.042.036-.13.06-.228 0l-1.275-.776a1.832 1.832 0 00-1.733-.074 6.926 6.926 0 01-.6.248 1.833 1.833 0 00-1.172 1.278l-.353 1.45c-.026.111-.106.157-.161.161a9.653 9.653 0 01-1.38 0c-.055-.004-.135-.05-.162-.16l-.351-1.45a1.833 1.833 0 00-1.173-1.278 6.928 6.928 0 01-.6-.25 1.832 1.832 0 00-1.734.075l-1.274.776c-.097.06-.186.036-.228 0a9.56 9.56 0 01-.976-.976c-.036-.042-.06-.13 0-.228l.776-1.275a1.832 1.832 0 00.074-1.733 6.948 6.948 0 01-.249-.6 1.833 1.833 0 00-1.277-1.172l-1.45-.353c-.111-.026-.157-.106-.161-.161a9.648 9.648 0 010-1.38c.004-.055.05-.135.16-.162l1.45-.351a1.833 1.833 0 001.278-1.173 6.95 6.95 0 01.249-.6 1.832 1.832 0 00-.074-1.734l-.776-1.274c-.06-.097-.036-.186 0-.228.302-.348.628-.674.976-.976.042-.036.13-.06.228 0l1.274.776a1.832 1.832 0 001.734.074 6.95 6.95 0 01.6-.249 1.833 1.833 0 001.172-1.277l.353-1.45c.026-.111.106-.157.161-.161z"
    />
  </Svg>
);

export const LogoutIcon = props => (
  <Svg
    width="15px"
    height="20px"
    viewBox="0 0 24 24"
    id="magicoon-Filled"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Defs></Defs>
    <G id="log-out-Filled">
      <Path
        fill="#fff"
        id="log-out-Filled-2"
        data-name="log-out-Filled"
        className="cls-1"
        d="M13,21a1,1,0,0,1-1,1H8a5.006,5.006,0,0,1-5-5V7A5.006,5.006,0,0,1,8,2h4a1,1,0,0,1,0,2H8A3,3,0,0,0,5,7V17a3,3,0,0,0,3,3h4A1,1,0,0,1,13,21Zm7.707-9.707-4-4a1,1,0,1,0-1.414,1.414L17.586,11H10a1,1,0,0,0,0,2h7.586l-2.293,2.293a1,1,0,1,0,1.414,1.414l4-4A1,1,0,0,0,20.707,11.293Z"
      />
    </G>
  </Svg>
);

export const PrivacyIcon = props => (
  <Svg
    width="15px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fill="none"
      stroke="#fff"
      strokeWidth={2}
      d="M18.0003,20.9998 C16.3453,20.9998 15.0003,19.6538 15.0003,17.9998 C15.0003,16.3458 16.3453,14.9998 18.0003,14.9998 C19.6543,14.9998 21.0003,16.3458 21.0003,17.9998 C21.0003,19.6538 19.6543,20.9998 18.0003,20.9998 L18.0003,20.9998 Z M24.0003,17.9998 L21.0003,17.9998 L24.0003,17.9998 Z M20.1213,20.1218 L22.2423,22.2428 L20.1213,20.1218 Z M18.0003,23.9998 L18.0003,20.9998 L18.0003,23.9998 Z M13.7573,22.2428 L15.8783,20.1208 L13.7573,22.2428 Z M12.0003,17.9998 L15.0003,17.9998 L12.0003,17.9998 Z M15.8783,15.8788 L13.7573,13.7578 L15.8783,15.8788 Z M18.0003,14.9998 L18.0003,11.9998 L18.0003,14.9998 Z M20.1213,15.8788 L22.2423,13.7578 L20.1213,15.8788 Z M12.5,12.5 C11.2660678,11.4458897 9.77508483,11 8,11 C4.13400675,11 1,13.0294373 1,18 L1,23 L11,23 M8,11 C10.7614237,11 13,8.76142375 13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,8.76142375 5.23857625,11 8,11 Z"
    />
  </Svg>
);

export const DocumentIcon = props => (
  <Svg
    width="15px"
    height="20px"
    viewBox="-1.27 0 30 30"
    id="_14_-_Document"
    data-name="14 - Document"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fill="#fff"
      id="Path_238"
      data-name="Path 238"
      d="M23.172,1.412A1,1,0,0,0,22.364,1H5.273a3,3,0,0,0-3,3V28a3,3,0,0,0,3,3H26.727a3,3,0,0,0,3-3V10.75a1,1,0,0,0-.191-.588l-6.364-8.75ZM21.854,3l5.873,8.075V28a1,1,0,0,1-1,1H5.273a1,1,0,0,1-1-1V4a1,1,0,0,1,1-1Z"
      transform="translate(-2.273 -1)"
      fillRule="evenodd"
    />
    <Path
      fill="#fff"
      id="Path_239"
      data-name="Path 239"
      d="M7.091,9.364H16a1,1,0,0,0,0-2H7.091a1,1,0,0,0,0,2Z"
      transform="translate(-2.273 -1)"
      fillRule="evenodd"
    />
    <Path
      fill="#fff"
      id="Path_240"
      data-name="Path 240"
      d="M28.727,11.182H23.364V2a1,1,0,0,0-2,0V12.182a1,1,0,0,0,1,1h6.363a1,1,0,0,0,0-2Z"
      transform="translate(-2.273 -1)"
      fillRule="evenodd"
    />
    <Path
      fill="#fff"
      id="Path_241"
      data-name="Path 241"
      d="M7.091,15.727H16a1,1,0,0,0,0-2H7.091a1,1,0,0,0,0,2Z"
      transform="translate(-2.273 -1)"
      fillRule="evenodd"
    />
    <Path
      fill="#fff"
      id="Path_242"
      data-name="Path 242"
      d="M7.091,21.455H19.818a1,1,0,0,0,0-2H7.091a1,1,0,0,0,0,2Z"
      transform="translate(-2.273 -1)"
      fillRule="evenodd"
    />
  </Svg>
);

export const HomeIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M13.3758 3.47015C12.5655 2.84328 11.4345 2.84328 10.6242 3.47015L3.87424 8.69205C3.32286 9.11861 3 9.77686 3 10.4745V18.7474C3 19.9915 4.00736 21 5.25 21H8.25C9.49264 21 10.5 19.9915 10.5 18.7474V16.4948C10.5 15.6655 11.1716 14.9931 12 14.9931C12.8284 14.9931 13.5 15.6655 13.5 16.4948V18.7474C13.5 19.9915 14.5074 21 15.75 21H18.75C19.9926 21 21 19.9915 21 18.7474V10.4745C21 9.77686 20.6771 9.11861 20.1258 8.69205L13.3758 3.47015Z"
      fill="#3A52EE"
    />
  </Svg>
);

export const GallaryIcon = props => (
  <Svg
    width="14px"
    height="14px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    {...props}>
    <Path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z" />
  </Svg>
);

export const CameraIcon = props => (
  <Svg
    width="14px"
    height="14px"
    viewBox="0 -4.2 30.002 30.002"
    id="_08_-_Camera"
    data-name="08 - Camera"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    {...props}>
    <Path
      id="Path_230"
      data-name="Path 230"
      d="M31,11a3,3,0,0,0-3-3H4a3,3,0,0,0-3,3V23.8a3,3,0,0,0,3,3H28a3,3,0,0,0,3-3V11Zm-2,0V23.8a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H28a1,1,0,0,1,1,1Z"
      transform="translate(-0.999 -5.199)"
      fillRule="evenodd"
    />
    <Path
      id="Path_231"
      data-name="Path 231"
      d="M29.6,8V7.2a2,2,0,0,0-2-2H24a2,2,0,0,0-2,2V8a2,2,0,0,0,2,2h3.6a2,2,0,0,0,2-2ZM24,7.2V8h3.6V7.2Z"
      transform="translate(-0.999 -5.199)"
      fillRule="evenodd"
    />
    <Path
      id="Path_232"
      data-name="Path 232"
      d="M16,12.2a5.2,5.2,0,1,0,5.2,5.2A5.2,5.2,0,0,0,16,12.2Zm0,2a3.2,3.2,0,1,1-3.2,3.2A3.2,3.2,0,0,1,16,14.2Z"
      transform="translate(-0.999 -5.199)"
      fillRule="evenodd"
    />
  </Svg>
);

// export const CheckIcon = props => (
//   <Svg
//     width="28px"
//     height="28px"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}>
//     <Polyline
//       fill="none"
//       stroke="#fff"
//       strokeWidth={2}
//       points="6 13 10.2 16.6 18 7"
//     />
//   </Svg>
// );
export const CheckIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.8198 6.19526C20.0601 6.45561 20.0601 6.87772 19.8198 7.13807L9.9736 17.8047C9.73328 18.0651 9.34364 18.0651 9.10332 17.8047L4.18024 12.4714C3.93992 12.2111 3.93992 11.7889 4.18024 11.5286C4.42056 11.2682 4.8102 11.2682 5.05053 11.5286L9.53846 16.3905L18.9495 6.19526C19.1898 5.93491 19.5794 5.93491 19.8198 6.19526Z"
      fill="#fff"
    />
  </Svg>
);

export const CloseIcon = props => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    {...props}>
    <Rect x={0} fill="none" width={24} height={24} />
    <G>
      <Path d="M17.705 7.705l-1.41-1.41L12 10.59 7.705 6.295l-1.41 1.41L10.59 12l-4.295 4.295 1.41 1.41L12 13.41l4.295 4.295 1.41-1.41L13.41 12l4.295-4.295z" />
    </G>
  </Svg>
);

export const BackIcon = props => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    {...props}>
    <Path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
  </Svg>
);

export const EditIcon = props => (
  <Svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000"
    {...props}>
    <Path
      d="M15 20.47H6.08C5.17469 20.4673 4.30737 20.1059 3.66815 19.4648C3.02894 18.8237 2.66999 17.9553 2.67 17.05V8.15999C2.66999 7.25468 3.02894 6.3863 3.66815 5.74521C4.30737 5.10413 5.17469 4.74264 6.08 4.73999H8.75C8.94891 4.73999 9.13968 4.81901 9.28033 4.95966C9.42098 5.10031 9.5 5.29108 9.5 5.48999C9.5 5.6889 9.42098 5.87967 9.28033 6.02032C9.13968 6.16097 8.94891 6.23999 8.75 6.23999H6.08C5.57252 6.24263 5.08672 6.44608 4.72881 6.80587C4.3709 7.16565 4.16999 7.6525 4.17 8.15999V17.05C4.16603 17.3038 4.21243 17.5559 4.30651 17.7916C4.4006 18.0274 4.5405 18.2422 4.71812 18.4235C4.89575 18.6049 5.10757 18.7492 5.34133 18.8481C5.57509 18.9471 5.82616 18.9987 6.08 19H15C15.2521 19 15.5018 18.9503 15.7348 18.8538C15.9677 18.7574 16.1794 18.6159 16.3576 18.4376C16.5359 18.2593 16.6774 18.0477 16.7738 17.8147C16.8703 17.5818 16.92 17.3321 16.92 17.08V15.27C16.92 15.0711 16.999 14.8803 17.1397 14.7397C17.2803 14.599 17.4711 14.52 17.67 14.52C17.8689 14.52 18.0597 14.599 18.2003 14.7397C18.341 14.8803 18.42 15.0711 18.42 15.27V17.05C18.42 17.4991 18.3315 17.9438 18.1597 18.3588C17.9878 18.7737 17.7359 19.1507 17.4183 19.4683C17.1007 19.7859 16.7237 20.0378 16.3088 20.2097C15.8938 20.3815 15.4491 20.47 15 20.47Z"
      fill="#000"
    />
    <Path
      d="M17.63 8.76999C17.4369 8.76772 17.2519 8.69203 17.1126 8.5583C16.9733 8.42457 16.8901 8.24283 16.88 8.04999C16.8649 7.74758 16.7771 7.45328 16.6239 7.19212C16.4706 6.93096 16.2566 6.71067 16 6.54999C15.7209 6.37187 15.4006 6.26856 15.07 6.24999C14.9715 6.24671 14.8746 6.22406 14.7849 6.18333C14.6951 6.14261 14.6143 6.08461 14.547 6.01264C14.4797 5.94068 14.4272 5.85616 14.3925 5.7639C14.3579 5.67165 14.3417 5.57348 14.345 5.47499C14.3483 5.3765 14.3709 5.27962 14.4116 5.18988C14.4524 5.10014 14.5104 5.0193 14.5823 4.95198C14.6543 4.88466 14.7388 4.83217 14.8311 4.79751C14.9233 4.76285 15.0215 4.74671 15.12 4.74999C15.9727 4.78201 16.7819 5.1344 17.3862 5.73683C17.9905 6.33926 18.3454 7.14742 18.38 7.99999C18.384 8.0985 18.3686 8.19684 18.3345 8.28937C18.3005 8.38191 18.2486 8.46683 18.1817 8.53927C18.1148 8.61172 18.0343 8.67027 17.9448 8.71158C17.8553 8.75288 17.7585 8.77613 17.66 8.77999L17.63 8.76999Z"
      fill="#000"
    />
    <Path
      d="M13 13.36H10.53C10.3311 13.36 10.1403 13.281 9.99967 13.1403C9.85902 12.9997 9.78 12.8089 9.78 12.61V10.09C9.78017 9.89115 9.85931 9.70051 10 9.56L15 4.56C15.0689 4.48924 15.1514 4.433 15.2424 4.39461C15.3334 4.35621 15.4312 4.33643 15.53 4.33643C15.6288 4.33643 15.7266 4.35621 15.8176 4.39461C15.9086 4.433 15.9911 4.48924 16.06 4.56L16.92 5.42C16.9946 5.49425 17.0528 5.58337 17.0907 5.68158C17.1286 5.77978 17.1454 5.88487 17.14 5.99C17.2451 5.98523 17.35 6.00233 17.4481 6.04019C17.5462 6.07806 17.6354 6.13588 17.71 6.21L18.58 7.07C18.7204 7.21062 18.7993 7.40124 18.7993 7.6C18.7993 7.79875 18.7204 7.98937 18.58 8.13L13.58 13.13C13.504 13.2057 13.4134 13.2651 13.3137 13.3047C13.214 13.3442 13.1072 13.363 13 13.36ZM11.24 11.86H12.69L17 7.57L16.66 7.24C16.5869 7.16468 16.5297 7.07538 16.4919 6.97743C16.4541 6.87949 16.4364 6.77492 16.44 6.67C16.3349 6.67538 16.2298 6.65857 16.1316 6.62067C16.0334 6.58277 15.9442 6.52461 15.87 6.45L15.54 6.12L11.28 10.4L11.24 11.86Z"
      fill="#000"
    />
    <Path
      d="M18.08 8.31999C17.8811 8.31982 17.6905 8.24069 17.55 8.1L16.68 7.24C16.6069 7.16468 16.5497 7.07538 16.5119 6.97743C16.4741 6.87949 16.4564 6.77492 16.46 6.67C16.3549 6.67538 16.2498 6.65857 16.1516 6.62067C16.0534 6.58277 15.9642 6.52461 15.89 6.45L15 5.59C14.8595 5.44937 14.7807 5.25875 14.7807 5.05999C14.7807 4.86124 14.8595 4.67062 15 4.53L17.55 1.99999C17.6906 1.85954 17.8812 1.78065 18.08 1.78065C18.2787 1.78065 18.4694 1.85954 18.61 1.99999L21.11 4.51C21.1808 4.57894 21.237 4.66136 21.2754 4.75238C21.3138 4.84341 21.3336 4.9412 21.3336 5.03999C21.3336 5.13879 21.3138 5.23658 21.2754 5.32761C21.237 5.41863 21.1808 5.50105 21.11 5.57L18.61 8.1C18.4695 8.24069 18.2788 8.31982 18.08 8.31999ZM17.21 6C17.3088 5.99777 17.4069 6.01618 17.4982 6.05406C17.5895 6.09195 17.6718 6.14846 17.74 6.21999L18.08 6.55L19.52 5.09999L18.08 3.60999L16.62 5.05999L16.95 5.38999C17.0246 5.46425 17.0828 5.55337 17.1207 5.65158C17.1586 5.74978 17.1754 5.85487 17.17 5.96L17.21 6Z"
      fill="#000"
    />
  </Svg>
);
