<template>
    <div>
        {{this.$store.state.usertoken}}
        <button @click="przycisk()"></button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            token: this.$store.state.usertoken
        }
    },
    methods: {
        przycisk(){
            const {token} = this
            if(token != null || undefined){
                this.$axios.post('/api/rooms', {token}).then((resolve) => {
                    if(resolve.status === 200){
                        alert('jestes zalogowany gituwa')
                    }
                    else{
                        alert('o ty podrabiancu')
                    }
                })
            }
            else{
                alert('Jestes niezalogowany!')
            }
        }
    }
}
</script>