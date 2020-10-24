<template>
  <div class="box">
    <div class="box2"><Nuxt /></div>
  </div>
</template>

<script>
export default {
  beforeMount() {
    const secure = location.protocol === 'https:'
    const port = secure ? '3002':'3001';
    window.socket = io(`${window.location.hostname}:${port}`, { secure });
  },
  mounted(){
    this.socket = window.socket;

    // If someone from the room will disconnect
    this.socket.on('userDC', () =>{
      alert('Utracono połączenie!');
      location.reload(true);
    })
  },
  watch: {
    $route(){
      // If user are not in room emit that
      if(this.$route.name != 'rooms-roomId'){
        this.socket.emit('notInRoom');
      }
    }
  },
}
</script>

<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
    background-image: url("../assets/bg/boat.jpg"); 
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
}
.box {
  margin: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  height: 100%;
}
.box2 {
  height: 100%;
}

html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
