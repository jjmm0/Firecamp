import axios from 'axios'

export default function ({ store, redirect }) {
  if(store.state.userdata.token || store.state.userdata.name || store.state.userdata.uid){
    let udata = store.state.userdata
    axios.post('/api/verify', {udata}).then((resolve) => {
      if(resolve.status === 200){
      }else if(resolve.status != 200){
        alert("podrobka")
        store.commit('logout')
        return redirect('/loginPage')
      }
    })
  }
}