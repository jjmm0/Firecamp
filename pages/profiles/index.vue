<template>
    <div>
        Lista profili:
        <div v-for="profile in profiles">
            <div><nuxt-link :to="`/profiles/${profile._id}`">{{profile.Login}}</nuxt-link></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            profiles: [{name: 'jd'}]
        }
    },
    mounted(){
        this.$axios.get('/api/profiles').then((resolve) => {
            this.profiles = resolve.data
        })
    },
}
</script>