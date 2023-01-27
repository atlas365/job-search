import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import useAuthState from '../hooks/useAuthState'
import { useAtom } from 'jotai'
import { likedRestaurantsAtom } from '../hooks/useLikedRestaurants'

const SettingsScreen = () => {
  const { logout } = useAuthState()
  const { navigate } = useNavigation()
  const [, updateLikedRestaurants] = useAtom(likedRestaurantsAtom)

  const logUserOut = () => {
    logout()
    navigate('Auth')
  }

  const resetLikes = () => {
    updateLikedRestaurants(() => [])
    navigate('Map')
  }


  return (
    <View style={styles.container}>
      <Pressable
        style={styles.logoutButton}
        onPress={logUserOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
      <Pressable
        style={styles.logoutButton}
        onPress={resetLikes}>
        <Text style={styles.logoutText}>Reset Likes</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 64,
    borderRadius: 24,
    elevation: 3,
    backgroundColor: '#4267B2',
    marginBottom: 12
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' 
  },
})

export default SettingsScreen