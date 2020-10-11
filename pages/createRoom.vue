<template>
    <div>
        <label>Nazwa Użytkownika:</label><br>
        <input type="text"><br>
        <label>Nazwa Pokoju:</label><br>
        <input type="text"><br>
        <label>Opis:</label><br>
        <input type="text">
    </div>
</template>

<style scoped>
/*@import ... */
</style>







<script>
export default {
    middleware: ['verify'],
}
</script>