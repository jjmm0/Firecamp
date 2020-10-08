export const state = () => {
    return {
      usertoken: null,
      username: null,
    }
  }
  export const mutations = {
    setAuth (state, {token, nickname}) {
      state.usertoken = token
      state.username = nickname
    },
    logout(state){
      state.usertoken = null
      state.username = null
    }
  }
  export const actions = {
    setInitialData: function({commit}){
  
      commit('setAuth', {token, nickname})
    }
  }
  
  
  