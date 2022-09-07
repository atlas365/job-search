import { MMKV } from 'react-native-mmkv' 

let storage
let loggedErrorOnce = false
const getStorage = () => {
  if (!storage) {
    try {
      storage = new MMKV()
    } catch (e) {
      if (!loggedErrorOnce) {
        loggedErrorOnce = true
        console.error('Error initializing MMKV storage:', e)
      }
    }
  }
  return storage
}

const Storage = {
  getItem: (key) => getStorage()?.getString(key),
  setItem: (key, value) => getStorage()?.set(key, value),
}

export default Storage
