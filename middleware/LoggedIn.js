export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.userdata || store.state.userdata == null) {
    if((store.state.userdata.token || store.state.userdata.uid || store.state.userdata.name == null || undefined))
    {
      store.commit('logout')
      return redirect('/loginPage')
    }
  }
}
  