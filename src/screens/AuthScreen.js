import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'
import useAuthState from '../hooks/useAuthState'
import useFacebookLogin from '../hooks/useFacebookLogin'

const AuthScreen = () => {
  const { authState, logout } = useAuthState()
  const { doFacebookLogin } = useFacebookLogin()
  const { navigate } = useNavigation()

  React.useEffect(() => {
    if (authState.token) {
      navigate('Main', { screen: 'Map' })
    }
  }, [authState.token])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome!
      </Text>

      <Text style={styles.message}>
        Login to get started
      </Text>

      {!authState?.token &&
        <Pressable
          style={styles.facebook}
          onPress={doFacebookLogin}
        >
          <Text style={styles.facebookText}>Login with Facebook</Text>
        </Pressable>
      }
      {authState.token &&
        <Pressable
          style={styles.facebook}
          onPress={logout}>
          <Text style={styles.facebookText}>Logout</Text>
        </Pressable>
      }     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebook: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 64,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: '#4267B2',
  },
  facebookText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' 
  },
  facebookLogo: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 32,
    paddingBottom: 16
  },
  message: {
    fontSize: 16,
    paddingBottom: 16
  },
})

export default AuthScreen