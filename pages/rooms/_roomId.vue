<template>
    <div class="wrapper">
        <div class="content">
             <div class="chatComp" ref="chat">
                <div v-for="msg in messages">
                    <div class="message" :class="{helperMessage: msg.helper, clientMessage: !msg.helper}" v-if="msg.helper"> 
                        <div class="headHelper">
                            <div class="avatar helperAvatar" v-if="msg.helper"><img :src="`/api/avatar/${helperID}`"></div>
                            <div class="avatar clientAvatar" v-if ="!msg.helper"><img :src="`/api/avatar/asdsdajsdgjkah`"></div>
                            <div class="dataHelper">
                                <div class="dateHelper">{{msg.time}}</div>
                                <div class="nickHelper">{{msg.nick}}</div>
                            </div>
                        </div>
                        <div class="valueH">{{msg.msg}}</div>
                    </div>
                    <div class="message" :class="{helperMessage: msg.helper, clientMessage: !msg.helper}" v-if="!msg.helper"> 
                        <div class="headClient">
                            <div class="avatar helperAvatar" v-if="msg.helper"><img :src="`/api/avatar/${helperID}`"></div>
                            <div class="dataClient">
                                <div class="nickClient">{{msg.nick}}</div>
                                <div class="dateClient">{{msg.time}}</div>
                            </div>
                            <div class="avatar clientAvatar" v-if="!msg.helper"><img :src="`/api/avatar/asdsdajsdgjkah`"></div>
                        </div>
                        <div class="valueC">{{msg.msg}}</div>
                    </div>
                </div>
             </div>
                <input :disabled="chat.waiting" class=" messageInput"  @keyup.enter="send()" v-model="chat.input" type="text" placeholder="Napisz wiadomość"/> 
                <div class="messageSend" @click="send()">
                    <svg class="Send" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>



                </div>
             <div class="helperComp">
                <div class="pfpContainer">
                    <img class="profilePicture" :src="`/api/avatar/${helperID}`" placeholder="Nie ma obrazka" id="userProfilePicture">
                    <div v-if="!this.chat.waiting" class="likes">
                        <svg class="helperLikes" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                        <span class="likesText"> {{helperLikes}}</span>
                    </div>
                </div>
                <div class="helperName">
                    {{helperName}}
                </div>
                <div class="helperDesc">
                    {{helperDesc}}
                </div>
             </div>
             <div v-if="!this.$store.state.userdata.token && !this.$store.state.userdata.uid && !this.$store.state.userdata.name && !this.chat.waiting" @click="like()" :class="{liked: liked}" class="likeContainer">
                <div class="likeButton button"  @click="like()" >
                    <svg class="Like" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                    Like
                </div>
             </div>
             <div @click="leaveChat()" class="endContainer">
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
                waiting: true,
            },
            // Helper information
            helperID: "none",
            helperName: 'Oczekiwanie...',
            helperDesc: '',
            helperLikes: 0,
            // Messages array
            messages: [],
            liked: true,
        }
    },
    mounted(){
        this.socket = window.socket;

        // Receive newMessage
        this.socket.on('newMessage', async (message) => {
            // Create message's sending date
            let hours = new Date().getHours().toString();
            let minutes = new Date().getMinutes().toString();
            if(hours.length == 1){
                hours =  "0" + hours.toString();
            }
            if(minutes.length == 1){
                minutes =  "0" + minutes.toString();
            }
            this.messages.push({msg: message.msg, nick: message.nick, helper: message.helper, time: `${hours}:${minutes}`});
            await this.$nextTick();
            this.scrollToBottom();
        });
        
        // Helper emit takeRoomData
        this.socket.emit('takeRoomData', {roomID : this.$route.params.roomId, helper: true});

        // If your helper joined, emit takeRoomData
        this.socket.on('helperJoined', () => {
            this.socket.emit('takeRoomData', {roomID : this.$route.params.roomId, helper: false});
        });

        this.socket.on('cantJoin', () => {
            // If u can't join to this room - route push
            this.$router.push('/');
        });

        // Receive helperData
        this.socket.on('helperData', (helperID) => {
            this.helperID = helperID;
            this.liked = false;
            this.messages = [];
            this.$axios.get(`/api/profile/${this.helperID}`).then((resolve) => {
                this.helperName = resolve.data.name;
                this.helperDesc = resolve.data.description;
                this.helperLikes = resolve.data.likes;
                this.chat.waiting = false;
                console.log(this.helperID);
            });
        });
    },
    methods: {
        isHelper(msg){
            if(msg.helper){
                return true;
                console.log(msg.helper)
            }
            else{
                return false
                console.log(msg.helper)
            }
        },
        scrollToBottom(){
                let chat = this.$refs.chat;
            if(chat){
                chat.scrollTop = chat.scrollHeight;
            }
        },
        send(){
            if(this.chat.input)
            {
                // Emit new message
                this.socket.emit('newMessage', this.chat);
                this.chat.input = '';
            }
        },
        leaveChat(){
            if(confirm("Opuścić chat?")){
                this.$router.push('/');
            }
        },
        async like(){
            // Emit like
            if(!this.liked)
            {
                await this.socket.emit('likeHelper', (this.helperID));
                await this.$axios.get(`/api/profile/${this.helperID}`).then((resolve) => {
                    this.helperLikes = resolve.data.likes;
                });
                this.liked = true
            }
        }

    }
}
</script>
<style scoped>
@import 'assets/style/Room/roomStyles.css';
</style>