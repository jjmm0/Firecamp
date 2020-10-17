<template>
    <div>
        Lista profili:
        <div v-for="profile in profiles">
            <div><nuxt-link :to="`/profile/${profile._id}`">{{profile.Login}}</nuxt-link></div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['verify'],
    data(){
        return{
            profiles: []
        }
    },
    mounted(){
        this.$axios.get('/api/profile').then((resolve) => {
            this.profiles = resolve.data
        })
    },
}
</script>