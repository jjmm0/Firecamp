<template>
    <div>
        Lista profili:
        <div v-for="profile in profiles">
            <div>{{profile.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            profiles: []
        }
    },
    mounted(){
        this.$axios.get('/api/profiles').then((resolve) => {
            this.profiles = resolve.data
            console.log(resolve.data)
        })
    }
}
</script>