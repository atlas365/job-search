import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { searchResultsAtom } from '../hooks/useRestaurantSearch';
import { useAtom } from 'jotai'
import SwipeDeck from '../components/SwipeDeck';
import MapView from 'react-native-maps'
import { likedRestaurantsAtom } from '../hooks/useLikedRestaurants';

const star = '\u2B50'
const dot = '\u00B7'

const stars = (starCount) => {
  let allStars = ''
  for (let i = 0; i < starCount; i++) {
    allStars += star
  }
  return allStars
}

const buildLocation = (location) => {
  let address = location.address1
  if (location.address2) {
    address += ` ${location.address2}`
    if (location.address3) {
      address += ` ${location.address3}`
    }
  }
  if (location.city) {
    address += ` ${location.city},`
  }
  if (location.state) {
    address += ` ${location.state}`
  }
  if (location.zip_code) {
    address += ` ${location.zip_code}`
  }

  return address
}
const DeckScreen = () => {
  const [{ data: searchResults }] = useAtom(searchResultsAtom)

  const [, updateLikedRestaurants] = useAtom(likedRestaurantsAtom)

  const renderCard = ({ id, name, coordinates, rating, price, review_count, categories, location }) => {
    return (
        <View key={id} style={styles.card}>
          <View style={{ height: 230 }}>
            <MapView
              style={{ flex: 1 }}
              region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
            />
          </View>
          <View>
            <Text style={styles.header}>{name}</Text>
            <Text style={{marginBottom: 12}}>
              {stars(rating)} {dot} {`(${review_count})`} {dot} {price} {dot} {categories?.[0]?.title}
            </Text>
            <Text>
              {buildLocation(location)}
            </Text>
          </View>
        </View>
    )
  }

  const renderNoMoreCards = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>No more restaurants</Text>
      </View>
    )
  }

  const onSwipeRight = (restaurant) => {
    updateLikedRestaurants(liked => liked.concat(restaurant))
  }
  
  const onSwipeLeft = (restaurant) => {
    console.log('left', restaurant?.name)
  }

  return (
    <View style={styles.container}>
      <SwipeDeck
        data={searchResults}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 370,
    width: 350,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  header: {
    fontSize: 24,
    marginBottom: 12
  },
  container: {
    marginTop: 128,
    marginLeft: 12
  }
})

export default DeckScreen