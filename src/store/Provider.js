
import React from 'react'
import useAuthState from "../hooks/useAuthState"

const Provider = () => {
  const { initAuthState } = useAuthState()
  React.useEffect(() => initAuthState(), [])
  return null
}

export default Provider