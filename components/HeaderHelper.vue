<template>
<div>
    <nuxt-link to="/"><img class="logo"
    src="https://pbs.twimg.com/profile_images/1170663788405825536/2mbm927v_400x400.jpg"/>
    </nuxt-link>
    <div class="buttons">
    <button @click="LogOut()">Wyloguj</button>
    <button>Profil</button>
    <button>Ranking</button>
</div>
</div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        LogOut(){
            this.$store.commit('logout')
            this.$router.push('/')
        }
    }
}
</script>
<style scoped>
@import "~/assets/style/Header/headerHelper.css";
</style>