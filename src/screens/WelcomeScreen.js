import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Slides from '../components/Slides'

const SLIDE_DATA = [
  {
    text: 'Welcome to the Jobs App!',
    color: '#03A9F4'
  },
  {
    text: 'Use this to get a job',
    color: '#009688'
  },
  {
    text: 'Set your locations, then swipe away',
    color: '#03A9F4'
  }
]

const WelcomeScreen = () => {

  const { navigate } = useNavigation()

  return (
    <View style={styles.main}>
      <Slides slides={SLIDE_DATA} onFinish={() => {navigate('Auth')}} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

export default WelcomeScreen