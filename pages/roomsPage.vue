<template>
  <div>
    <HeaderHelper/>
    <RoomWindow />
  </div>
</template>

<script>
export default {
  middleware: ['LoggedIn', 'verify'],
}
</script>