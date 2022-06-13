import React from 'react';
import {BerlinTabBarNavigator, DotSize} from 'rn-slick-bottom-tabs';
import FloatingButton from '../../components/FloatingButton';
// import {Ionicons as Icon} from '@expo/vector-icons'
import TabOne from '../../Screens/Home';
import TabTwo from '../../Screens/Profile';
import {HomeIcon} from '../../SVG/index';

const Tabs = BerlinTabBarNavigator();

const TabBarIcon = props => {
  return <HomeIcon />;
};

export default () => (
  <Tabs.Navigator
    backBehavior="history"
    screenOptions={{
      animation: 'slide_from_right',
    }}
    initialRouteName="TabOne"
    tabBarOptions={{
      activeTintColor: '#7A28CB',
      inactiveTintColor: '#9e9e9e',
      activeBackgroundColor: '#e5cfff',
    }}
    appearance={{
      dotSize: DotSize.MEDIUM,
      tabBarBackground: '#171719',
    }}>
    <Tabs.Screen
      name="Home"
      component={TabOne}
      options={{
        tabBarIcon: ({focused, color}) => <TabBarIcon />,
      }}
    />

    <Tabs.Screen
      component={FloatingButton}
      options={{
        tabBarIcon: ({focused, color}) => <TabBarIcon />,
      }}
    />
  </Tabs.Navigator>
);
