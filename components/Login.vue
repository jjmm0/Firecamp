<template>
  <div class="wrapper">
    <div class="form-group">
      <label for="login">Nazwa użytkownika</label>
      <br>
      <input id="login" class="form-control">
      <br>
      <label for="password">Hasło</label>
      <br>
      <input id="password" class="form-control">
      <br>
      <div class="button">
        <button type="submit" class="btn btn-primary">Zaloguj się</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '~/assets/style/Login/loginStyles.css';
</style>