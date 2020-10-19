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
            <input style="background-color: red;" @keyup.enter="send(chat.input)" v-model="chat.input" type="text" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            chat: {
                socket: this.$route.params.roomId,
                input: '',
            },
            messages: []
        }
    },
    mounted(){
        this.socket = this.$nuxtSocket({})
        this.socket.on('newMessage', (message) => {
            this.messages.push({msg: message.input, nick: 'jakisnick'})
        })
    },
    methods: {
        send(message){
            this.socket.emit('newMessage', this.chat)
        }
    }
}
</script>