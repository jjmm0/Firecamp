export default function ({ store, redirect }) {
    // If the user is authenticated
    if (store.state.userdata.token) {
      return redirect('/roomsPage')
    }
  }
  