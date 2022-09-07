import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthScreen from './src/screens/AuthScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import MapScreen from './src/screens/MapScreen'
import DeckScreen from './src/screens/DeckScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import ReviewScreen from './src/screens/ReviewScreen'
import HeaderButton from './src/components/HeaderButton'
import Provider from './src/store/Provider'

const ReviewStack = createNativeStackNavigator()
function ReviewStacks() {
  return (
    <ReviewStack.Navigator>
      <ReviewStack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          title: "Review Jobs",
          headerRight: () => (
            <HeaderButton title={'Settings'} destination={'Settings'} />
          )
        }}
      />
      <ReviewStack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </ReviewStack.Navigator>
  )
}


const HomeTab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Map"
        component={MapScreen}
      />
      <HomeTab.Screen
        name="Deck"
        component={DeckScreen}
      />
      <HomeTab.Screen 
        name="ReviewStack" 
        component={ReviewStacks} 
      />
    </HomeTab.Navigator>
  );
}

const MainTab = createBottomTabNavigator();
export default function App() {
  return (
    <>
      <Provider />
      <NavigationContainer>
        <MainTab.Navigator>
          <MainTab.Screen name="Auth" component={AuthScreen} />
          <MainTab.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
          <MainTab.Screen name="Main" component={HomeTabs} />
        </MainTab.Navigator>
      </NavigationContainer>
    </>
  );
}