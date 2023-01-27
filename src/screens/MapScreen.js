import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps'
import useRestaurantSearch, { searchResultsAtom } from '../hooks/useRestaurantSearch';
import { useAtom } from 'jotai'

const MapScreen = () => {
  const { navigate } = useNavigation()

  const { searchRestaurants } = useRestaurantSearch()
  const [{ data, error, fetching }] = useAtom(searchResultsAtom)

  const [region, setRegion] = React.useState({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  })

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion)
  }

  const search = () => {
    searchRestaurants('pizza', region.latitude, region.longitude, region.longitudeDelta)
  }

  React.useEffect(() => {
    if (data && data.length) {
      navigate('Main', { screen: 'Deck' })
    }
  }, [data])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}        
        showsUserLocation={true}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={search} style={styles.button} disabled={fetching}>
          <Text style={styles.buttonText}> Search this area </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' 
  },
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