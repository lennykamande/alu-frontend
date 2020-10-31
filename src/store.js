import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userName: null

  },
  mutations: {
    authUser (state, userData){
      state.idToken = userData.token,
      state.userName = userData.name
    },
    clearAuthData (state){
      state.idToken = null
      state.userName = null
    }
  },
  actions: {
    logout({commit}){
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      commit('clearAuthData')
      router.replace('/signin')
    },

    signup({commit}, authData){
        axios.post('/auth/signup', 
         {
          email: authData.email,
          password: authData.password,
          first_name: authData.firstname,
          last_name: authData.lastname,
          username: authData.username})
          .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.AuthToken)
            localStorage.setItem('name', res.data.username)
            commit('authUser', 
            {
              token: res.data.AuthToken,
              name: res.data.username
            })
            router.replace('/dashboard')
          })
          .catch(error => console.log(error))
      },
    login({commit}, authData){
      axios.post('/auth/login', {
        username: authData.username,
          password: authData.password,
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.AuthToken)
        localStorage.setItem('name', res.data.name)
        commit('authUser', 
        {
          token: res.data.AuthToken,
          name: res.data.name
        })
        router.replace('/dashboard')
      })
          .catch(error => console.log(error))
      },
      autoLogin({commit}){
        const token = localStorage.getItem('token')
        if (!token){
          return
        }
        const name = localStorage.getItem('name')
        commit('authUser',{
          token: token,
          name: name
        })
        router.replace('/dashboard')
      }

      
  },
  getters: {
    user (state){
      return state.userName
    },
    isAuthenticated (state){
      return state.idToken !== null
    }
  }
})