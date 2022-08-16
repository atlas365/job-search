import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { facebookLogin } from '../reducers'

const AuthScreen = () => {
  //const token = useSelector((state) => state.token)
  
  //const dispatch = useDispatch()
  return (
    <View>
      <Text>
        Auth Screen
      </Text>
      <Text>
        {'nope'}
      </Text>
      <Text>
        Auth Screen
      </Text>
      
    </View>
  )
}

export default AuthScreen