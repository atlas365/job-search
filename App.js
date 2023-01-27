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
import Ionicons from '@expo/vector-icons/Ionicons';

const ReviewStack = createNativeStackNavigator()
function ReviewStacks() {
  return (
    <ReviewStack.Navigator>
      <ReviewStack.Screen
        name="Liked Restautants"
        component={ReviewScreen}
        options={{
          title: "Liked Restaurants",
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
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => {
            return (
              <Ionicons name="location" size={30} color={color} />
            )
          },
          title: 'Search',
          tabBarShowLabel: false
        }}
      />
      <HomeTab.Screen
        name="Deck"
        component={DeckScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => {
            return (
              <Ionicons name="pizza" size={30} color={color} />
            )
          },
          tabBarShowLabel: false
        }}
      />
      <HomeTab.Screen 
        name="ReviewStack" 
        component={ReviewStacks}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => {
            return (
              <Ionicons name="list" size={30} color={color} />
            )
          },
          tabBarShowLabel: false
        }}
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
          <MainTab.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false, tabBarStyle: { display: 'none' }}}
          />
          <MainTab.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false, tabBarStyle: { display: 'none' }}}
          />
          <MainTab.Screen
            name="Main"
            component={HomeTabs}
            options={{ headerShown: false, tabBarStyle: { display: 'none' }}}
          />
        </MainTab.Navigator>
      </NavigationContainer>
    </>
  );
}