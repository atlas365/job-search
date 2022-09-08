import React from 'react'
import { Text, View, Pressable, StyleSheet, Image } from 'react-native'
import useAuthState from '../hooks/useAuthState'
import useFacebookLogin from '../hooks/useFacebookLogin'


const AuthScreen = () => {
  const { authState, logout } = useAuthState()
  const { doFacebookLogin } = useFacebookLogin()

  // React.useEffect(() => {
  //   if (!authState?.token) {
  //     doFacebookLogin()
  //   }
  // }, [authState, doFacebookLogin])

  return (
    <View style={styles.container}>
      <Text>
        {authState.token ?? ''}
      </Text>
      <Text>
      <Text>
        {authState.name ?? ''}
      </Text>
      </Text>
      {!authState?.token &&
        <Pressable
          style={styles.facebook}
          onPress={doFacebookLogin}
        >
          <Text style={styles.facebookText}>Login with Facebook</Text>
        </Pressable>
      }
      {authState?.token &&
        <Pressable
          title="Logout"
          onPress={logout}
        />
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
  }
})

export default AuthScreen