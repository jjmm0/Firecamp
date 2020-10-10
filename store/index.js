export const state = () => {
    return {
      userdata: {
        token: null,
        name: null,
      }
    }
  }
  export const mutations = {
    setAuth (state, {token, nickname}) {
      state.userdata.token = token
      state.userdata.name = nickname
    },
    logout(state){
      state.userdata.token = null
      state.userdata.name = null
    }
  }
  export const actions = {
    setInitialData: function({commit}){
  
      commit('setAuth', {token, nickname})
    }
  }
  
  
  