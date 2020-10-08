export const state = () => {
    return {
      usertoken: null,
    }
  }
  export const mutations = {
    setAuth (state, auth) {
      state.usertoken = auth
    },
    logout(state){
      state.usertoken = null
    }
  }
  export const actions = {
    setInitialData: function({commit}){
  
      commit('setAuth', auth)
    }
  }
  
  