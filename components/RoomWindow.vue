<template>
    <div class="wrapper">
      <div class="info">
        <p id="roomName" >Nazwa</p>
        <p id="roomDescription">AOJSBFAJIHSVFKFSHVGAJKSGFVAKJSHFVAKJHVS</p>
        <p id="username">NazwaUser</p>
      </div>

            <!-- <div v-for="room in rooms" class="info">
        <p id="roomName" >{{room.name}}</p>
        <p id="roomDescription">{{room.desc}}</p>
        <p id="username">{{room.uname}}</p>
      </div> -->
    </div>
</template>

<style scoped>
@import '~/assets/style/RoomWindow/roomWindowStyles.css';
</style>

<script>
export default {
  data(){
    return{
      rooms: [{name: "ej", uname: "Andrzej", desc: "Psycha siada"},
      {name: "ej", uname: "Tomasz", desc: "opis"},
      {name: "ej", uname: "Janusz", desc: "pomoc"},
      {name: "ej", uname: "Es", desc: "lol"},]
    }
  }
}
</script>