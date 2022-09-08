import * as Facebook from 'expo-facebook';
import useAuthState from "./useAuthState";


const useFacebookLogin = () => {

  const { login } = useAuthState()

  const doFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '796629878009192',
      });
      const { type, token } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const { name, id } = (await response.json())
        login({ token, name, id })
      } else if (type === 'cancel') {
        console.log('cancel')
      } else {
        console.log('Error loggin in')

      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return {
    doFacebookLogin
  }
}

export default useFacebookLogin