export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
     if(store.state.userdata){
         config.headers.common["utoken"] = store.state.userdata.token
         config.headers.common["uid"] = store.state.userdata.uid
         config.headers.common["uname"] = store.state.userdata.name
     }
    })
}