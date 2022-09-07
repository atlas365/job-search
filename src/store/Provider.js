import useAuthState from "../hooks/useAuthState"

const Provider = () => {
  const { initAuthState } = useAuthState()
  initAuthState()
  return null
}

export default Provider