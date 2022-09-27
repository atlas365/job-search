import { useAtom, atom } from 'jotai'
import Storage from '../store'

const authStateAtom = atom({
  token: undefined,
  name: undefined,
  id: undefined
})

const useAuthState = () => {
  const [authState, setAuthState] = useAtom(authStateAtom)

  const login = async (newAuthState) => {
    Storage.setItem('auth_state', JSON.stringify(newAuthState))
    setAuthState(newAuthState)
  }

  const logout = () => {
    Storage.setItem('auth_state', JSON.stringify({}))
    setAuthState({})
  }

  const initAuthState = () => {
    const state = Storage.getItem('auth_state')
    if (state) {
      setAuthState(JSON.parse(state))
    }
  }

  return {
    authState,
    login, 
    logout,
    initAuthState,
  }
}

export default useAuthState