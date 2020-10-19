<template>
    <div>
        <div style="background-color: white; width: 1500px; height: 600px; margin: 40px; padding: 1%;">
            <div style="background-color: gray; color: green; height: 100%; width: 100%">
                <div>Wiadomosc</div>
                <div>Wiadomosc</div>
                <div>Wiadomosc</div>
            </div>
            <input style="background-color: red;" @keyup.enter="send(chatInput)" v-model="chatInput" type="text" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            chatInput: "lol"
        }
    },
    methods: {
        send(message){
            alert(message)
        }
    }
}
</script>