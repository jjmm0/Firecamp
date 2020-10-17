export default function ({ store, redirect }) {
  // If the user is not authenticated
  if(store.state.userdata){
    if((store.state.userdata.token == null) || (store.state.userdata.name == null) || (store.state.userdata.uid == null)){
      store.commit('logout')
      redirect('/loginPage')
    }
  }else if(!store.state.userdata){
    store.commit('logout')
    redirect('/loginPage')
  }
}
  