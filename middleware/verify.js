export default async function ({ store, $axios, redirect }) {
  if(store.state.userdata){
    if(store.state.userdata.token || store.state.userdata.name || store.state.userdata.uid != null){
      $axios.post('/api/verify').then((resolve) => {
        if(resolve.status === 200){
          //Do something
        }
        else if(resolve.status != 200){
          store.commit('logout')
          return redirect('/loginPage')
        }
      })
    }
  }
}