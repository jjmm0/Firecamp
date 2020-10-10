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
        }
    },
    methods: {
        przycisk(){
            let udata = this.$store.state.userdata
            if((udata.token && udata.name) != (null || undefined)){
                this.$axios.post('/api/rooms', {udata}).then((resolve) => {
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