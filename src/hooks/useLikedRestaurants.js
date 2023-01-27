import { useAtom, atom } from 'jotai'

export const likedRestaurantsAtom = atom([])

const useLikedRestaurants = () => {

  const [likedRestaurants, updateLikedRestaurants] = useAtom(likedRestaurantsAtom)

  const setLikedRestaurants = (restaurants) => {
    updateLikedRestaurants(restaurants)
  }

  return {
    likedRestaurants,
    setLikedRestaurants,
  }
}

export default useLikedRestaurants