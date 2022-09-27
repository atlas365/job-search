import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import useAuthState from '../hooks/useAuthState'

const SettingsScreen = () => {
  const { logout } = useAuthState()
  const { navigate } = useNavigation()

  const logUserOut = () => {
    logout()
    navigate('Auth')
  }
  return (
    <View>
      <Pressable
        style={styles.logoutButton}
        onPress={logUserOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' 
  },
})

export default SettingsScreen