<template>
  <div class="wrapper">
    <div class="forms">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input id="login">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input id="password">
      <br>
      <div class="button">
        <button type="submit" class="submitButton">Zaloguj się</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '~/assets/style/Login/loginStyles.css';
</style>