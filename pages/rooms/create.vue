<template>
    <div>
        <label>Nazwa Użytkownika:</label><br>
        <input v-model="room.uname" type="text"><br>
        <label>Nazwa Pokoju:</label><br>
        <input v-model="room.name" type="text"><br>
        <label>Opis:</label><br>
        <input v-model="room.description" type="text">

        <button @click="createRoom">CREATE</button>
    </div>
</template>

<style scoped>
/*@import ... */
</style>







<script>
export default {
    middleware: ['verify', 'notLoggedIn'],
    data(){
        return{
            room: {
                name: "",
                description: "",
                uname: "",
            }
        }
    },
    mounted(){
        this.socket = this.$nuxtSocket({
        name: "main",
        })    
    },
    methods: {
        createRoom(){
            const room = this.room
            this.socket.emit('newRoom', room)
        }
    }
    
}
</script>