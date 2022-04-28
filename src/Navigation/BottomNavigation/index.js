import React from 'react';
import {BerlinTabBarNavigator, DotSize} from 'rn-slick-bottom-tabs';
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
      name="Profile"
      component={TabTwo}
      options={{
        tabBarIcon: ({focused, color}) => <TabBarIcon />,
      }}
    />
    {/* <Tabs.Screen
            name="TabThree"
            component={TabThree}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="rocket"
                    />
                ),
            }}
        /> */}
    {/* 
        <Tabs.Screen
            name="FourthTab"
            component={FourthScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="ios-notifications"
                    />
                ),
            }}
        /> */}
  </Tabs.Navigator>
);
