export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.userdata.token || !store.state.userdata.name || !store.state.userdata.uid) {
    store.commit('logout')
    return redirect('/loginPage')
  }
}
  