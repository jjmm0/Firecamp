export default function ({ store, redirect }) {
  // If the user is authenticated
  if(store.state.userdata && store.state.userdata != null){
    if (store.state.userdata.token || store.state.userdata.name || store.state.userdata.uid) {
    return redirect('/rooms')
    }
  }
}
  