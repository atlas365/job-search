import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen