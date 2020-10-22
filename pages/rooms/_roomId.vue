            <!-- <div style="background-color: gray; color: green; height: 100%; width: 100%">
                <div v-for="msg in messages">
                    <div>{{msg.msg}}</div>
                    <div>{{msg.nick}}</div>
                </div>
            <input style="background-color: red;" @keyup.enter="send()" v-model="chat.input" type="text" /> -->
<template>
    <div class="wrapper">
        {{helperID}}
        <div class="content">
             <div class="chatComp" ref="chat">
                <div v-for="msg in messages">
                    <div>{{msg.msg}}</div>
                    <div>{{msg.nick}}</div>
                </div>
             </div>
                <input class=" messageInput"  @keyup.enter="send()" v-model="chat.input" type="text" placeholder="Napisz wiadomość"/> 
                <div class="messageSend" @click="send()">
                    Wyślij
                </div>
             <div class="helperComp">
                <img class="helperComp" :src="`/api/avatar/${helperID}`" placeholder="Nie ma obrazka" id="userProfilePicture">
             </div>
             <div class="likeContainer">
                <div class="likeButton button">
                    <svg class="Like" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    Like
                </div>
             </div>
             <div class="endContainer">
                <div class="endButton button">
                    <svg class="Exit" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Zakończ czat
                </div>
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
            helperID: "none",
            messages: []
        }
    },
    mounted(){
        this.socket = window.socket

        // Receive newMessage
        this.socket.on('newMessage', async (message) => {
            this.messages.push({msg: message.msg, nick: message.nick})
            await this.$nextTick();
            this.scrollToBottom()
        })
        // Take data about room(helperID etc.)
        this.socket.emit('takeRoomData')
        this.socket.on('cantJoin', () => {
            // If u can't join to this room - route push
            this.$router.push('/')
        })
        // Take helper data
        this.socket.on('helperData', (helperID) => {
            this.helperID = helperID
        })
    },
    methods: {
        scrollToBottom(){
            let chat = this.$refs.chat
            
            chat.scrollTop = chat.scrollHeight;  
        },
        // Emit new message
        send(){
            if(this.chat.input)
            {
                this.socket.emit('newMessage', this.chat)
                this.chat.input = ''
            }
        }
    }
}
</script>
<style scoped>
@import 'assets/style/Room/roomStyles.css';
</style>