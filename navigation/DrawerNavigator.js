import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from 'react-native';
import {NavigationContainer, navigationContainer} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Colors } from '../Components/Constants';

import Menu from '../Components/Menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Settings from '../Components/Settings';
import DrawerScreen from './Drawer';

const WIDTH = Dimensions.get('window').width

const Tab = createBottomTabNavigator();

const ICON_SIZE = 25;

const GET_OPTIONS = (title) => {
  let OPTIONS={
    headerShown: true,
    headerTitle: title,
    headerStyle: {backgroundColor: Colors.mainBackground},
    headerTitleStyle: styles.TextStyle,
    headerBackTitleVisible: false,
    headerTintColor: Colors.mainForeGround,
  }
  return OPTIONS;
}

const DrawerNavigator = () => {
  return (
      <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Articles') {
            return <Icon name={'menu'} size={ICON_SIZE} color={color} />;
          } else if (route.name === 'Settings') {
            return <Icon2 name={'settings'} size={ICON_SIZE} color={color} />;
          }
        },
      })}
        tabBarOptions={{
          activeBackgroundColor: Colors.mainBackground,
          inactiveBackgroundColor: Colors.mainBackground,
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle:{
            fontSize: hp('2%')
          }
        }}
      >
        <Tab.Screen name={'Articles'} component={Menu} nav/>
        <Tab.Screen name={'Settings'} component={Settings} />
      </Tab.Navigator>
  );
};

export default DrawerNavigator;