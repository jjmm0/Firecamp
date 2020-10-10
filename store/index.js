export const state = () => {
    return {
      userdata: {
        token: null,
        name: null,
        uid: null,
      }
    }
  }
  export const mutations = {
    setAuth (state, {token, nickname, userid}) {
      state.userdata.token = token
      state.userdata.name = nickname
      state.userdata.uid = userid
    },
    logout(state){
      state.userdata.token = null
      state.userdata.name = null
      state.userdata.uid = null
    }
  }
  export const actions = {
    setInitialData: function({commit}){
  
      commit('setAuth', {token, nickname, userid})
    }
  }
  
  
  