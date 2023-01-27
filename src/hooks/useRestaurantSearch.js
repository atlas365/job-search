import { useAtom, atom } from 'jotai'
import yelp from '../apis/yelp'

export const searchResultsAtom = atom({
  data: undefined,
  error: undefined,
  fetching: undefined
})

const useRestaurantSearch = () => {

  const [, updateSearchResultsAtom] = useAtom(searchResultsAtom)

  const searchRestaurants = async (term, latitude, longitude, longitudeDelta, ) => {
    try {
      updateSearchResultsAtom(searchResults => ({ ...searchResults, fetching: true }))
      const radius = Math.round(111139 * longitudeDelta)
      const { data } = await yelp.get('/search', {
        params: {
          limit: 10,
          term,
          latitude,
          longitude,
          radius
        }
      })
      updateSearchResultsAtom(() => ({ data: data.businesses, fetching: false, error: undefined }))
    } catch (err) {
      updateSearchResultsAtom(() => ({ data: undefined, fetching: false, error: 'Error fetching results!' }))
    }
  }

  return {
    searchRestaurants,
  }
}

export default useRestaurantSearch