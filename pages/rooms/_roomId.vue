<template>
    <div>
        <div style="background-color: white; width: 1500px; height: 600px; margin: 40px; padding: 1%;">
            <div style="background-color: gray; color: green; height: 100%; width: 100%">
                <div v-for="msg in messages">
                    <div>{{msg.msg}}</div>
                    <div>{{msg.nick}}</div>
                </div>
                {{chat.socket}}
            </div>
            <input style="background-color: red;" @keyup.enter="send()" v-model="chat.input" type="text" />
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'verify',
    data(){
        return{
            //Informacje chatu(nick, id, input)
            chat: {
                nick: this.$store.state.userdata.nick || null,
                socket: this.$route.params.roomId,
                input: '',
            },
            //Tablica z wiadomościami
            messages: []
        }
    },
    mounted(){
        this.socket = window.socket

        this.socket.on('newMessage', (receivedChat) => {
            this.messages.push({msg: receivedChat.input, nick: receivedChat.nick})
        })

        this.socket.emit('roomConnect', this.$route.params.roomId)
    },
    methods: {
        send(){
            this.socket.emit('newMessage', this.chat)
        }
    }
}
</script>
<style>
@import 'assets/style/Room/roomStyles.css';
</style>
