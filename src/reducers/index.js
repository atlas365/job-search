import { combineReducers, createSlice } from '@reduxjs/toolkit'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
// import * as Facebook from 'expo-facebook';

export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success'
export const FACEBOOK_LOGIN_ERROR = 'facebook_login_error' 

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    facebookLogin: async (state) => {
      let token = await AsyncStorage.getItem('token')
      console.log('1', token)
      if (token) {
        state.token = token
      } else {
        state.token = 'testtoken'
        //doFacebookLogin(state)
      }
    }
  }
})

// export const facebookLogin = () => async dispatch => {
//   let token = await AsyncStorage.getItem('token')
//   if (token) {
//     dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
//   } else {
//     doFacebookLogin(dispatch)
//   }
// }

// const doFacebookLogin = async state => {
//   try {
//     await Facebook.initializeAsync({
//       appId: '796629878009192',
//     });
//     const { type, token } =
//       await Facebook.logInWithReadPermissionsAsync({
//         permissions: ['public_profile'],
//       });
//     if (type === 'success') {
//       // Get the user's name using Facebook's Graph API
//       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
//       console.log('response', response)
//       console.log('token', token)
//       await AsyncStorage.setItm('token', token)
//       state = token
//     } else if (type === 'cancel') {
//       console.log('cancle')
//     } else {
//       state.error = 'Error with login'
//     }
//   } catch ({ message }) {
//     alert(`Facebook Login Error: ${message}`);
//   }
// }

export const { facebookLogin } = authSlice.actions

export default authSlice.reducer