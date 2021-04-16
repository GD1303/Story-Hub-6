import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './screens/LoginScreen';
import WriteStory from './screens/WriteStoryScreen';
import ReadStory from './screens/ReadStoryScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    WriteStory: {screen: WriteStory},
    ReadStory: {screen: ReadStory},
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const routeName = navigation.state.routeName;
        if(routeName === "WriteStory") {
          return <Image
            source = { require("./assets/write.png") }
            style = {{ width: 40, height: 40 }}
          />
        } else if(routeName === "ReadStory") {
          return <Image
            source = { require("./assets/read.png") }
            style = {{ width: 40, height: 40 }}
          />
        }
      }
    })
  }
);

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator },
})

const AppContainer =  createAppContainer(SwitchNavigator);