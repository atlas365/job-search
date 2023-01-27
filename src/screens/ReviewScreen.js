import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { likedRestaurantsAtom } from '../hooks/useLikedRestaurants'
import { useAtom } from 'jotai'
import MapView, { Marker } from 'react-native-maps'

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

const ReviewScreen = () => {

  const [likes] = useAtom(likedRestaurantsAtom)

  const returnLikedRestuarants = () => {
    return likes.map(like => (
      <View style={styles.card} key={like.id}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: like.coordinates.latitude,
            longitude: like.coordinates.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          scrollEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: like.coordinates.latitude,
              longitude: like.coordinates.longitude,
            }}
            title={like.name}
          />
        </MapView>
        <Text style={styles.header}>{like.name}</Text>
        <Text style={{marginBottom: 12}}>
          {stars(like.rating)} {dot} {`(${like.review_count})`} {dot} {like.price} {dot} {like.categories?.[0]?.title}
        </Text>
        <Text>
          {buildLocation(like.location)}
        </Text>
      </View>
    ))
  }

  return (
    <View>
     <ScrollView>
      {returnLikedRestuarants()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 300,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 24,
    marginBottom: 8,
    marginTop: 12
  },
  container: {
    marginTop: 128,
    marginLeft: 12
  }
})


export default ReviewScreen