<template>
    <div>
        <button @click="method1()">PRZYCISK</button>
    </div>
</template>





<script>
export default {
  mounted() {

    this.socket = this.$nuxtSocket({
      channel: "/index",
    })


    /* Listen for events: */
    this.socket.on('method1', (msg) => {
      /* Handle event */
      alert(msg)
    })
  },
  methods: {
    method1() {
        console.log(this.socket)
      /* Emit events */
      this.socket.emit('method1', {hello: 'world'})
    //     ,(resp) => {
    //     /* Handle response, if any */
    //   })
    }
  }
}
</script>