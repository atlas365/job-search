import React from 'react'
import { Text, View, Button } from 'react-native'
import useAuthState from '../hooks/useAuthState'
import useFacebookLogin from '../hooks/useFacebookLogin'


const AuthScreen = () => {
  const { authState } = useAuthState()
  console.log('state', authState)
  
  const { doFacebookLogin } = useFacebookLogin()

  return (
    <View>
      <Text>
        Auth Screen
      </Text>
      <Text>
        {authState.token ?? ''}
      </Text>
      <Text>
      <Text>
        {authState.name ?? ''}
      </Text>
      </Text>
      <Button
        title="Login"
        onPress={doFacebookLogin}
      />
    </View>
  )
}

export default AuthScreen