            <!-- <div style="background-color: gray; color: green; height: 100%; width: 100%">
                <div v-for="msg in messages">
                    <div>{{msg.msg}}</div>
                    <div>{{msg.nick}}</div>
                </div>
            <input style="background-color: red;" @keyup.enter="send()" v-model="chat.input" type="text" /> -->
<template>
    <div class="wrapper">
        <div class="content">
             <div class="chatComp">

             </div>
             <div class="message">
                <input style="background-color: red;" @keyup.enter="send()" v-model="chat.input" type="text" /> -->
             </div>
             <div class="helperComp">

             </div>
             <div class="likeButton button">

             </div>
             <div class="endButton button">

             </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['verify'],
    data(){
        return{
            // Chat information
            chat: {
                nick: this.$store.state.userdata.name,
                input: '',
            },
            messages: []
        }
    },
    mounted(){
        this.socket = window.socket

        // Receive newMessage
        this.socket.on('newMessage', (message) => {
            this.messages.push({msg: message.msg, nick: message.nick})
        })
    },
    methods: {
        send(){
            // Emit newMessage
            this.socket.emit('newMessage', this.chat)
        }
    }
}
</script>
<style>
@import 'assets/style/Room/roomStyles.css';
</style>
