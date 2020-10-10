<template>
    <div>
        Nazwa uzytkownika: {{name}}, OPIS: {{description}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: null,
            description: null,
        }
    },
    mounted(){
        this.$axios.get(`/api/profiles/${this.$route.params.userId}`).then((resolve) => {
            this.name = resolve.data.name
            this.description = resolve.data.description
        })
    }
}
</script>