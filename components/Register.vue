<template>
  <div class="container">
    <div class="stuff">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input id="login">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input id="password">
      <br>
      <label for="confirmPassword">Potwierdź hasło</label>
      <br>
      <input id="confirmPassword">
      <br>
      <div class="button">
        <button type="submit" class="submitButton">Zarejestruj się</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '~/assets/style/Register/registerStyles.css';
</style>