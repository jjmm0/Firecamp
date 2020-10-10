import axios from 'axios'

export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.userdata.token) {
      return redirect('/loginPage')
    }

    if(store.state.userdata.token){
      let udata = store.state.userdata
      axios.post('/api/verify', {udata}).then((resolve) => {
        if(resolve.status === 200){
          console.log('wyslalo git')
        }else if(resolve.status != 200){
          alert("podrobka")
          store.commit('logout')
          return redirect('/loginPage')
        }
      })
    }
  }
  