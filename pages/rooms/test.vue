<template>
    <div>
      <div v-for="message in msg">
        <div>{{message.message}}</div>
        <div>a tu nick by byl</div>

      </div>
        <button @click="method1()">PRZYCISK</button>
    </div>
</template>



<script>
export default {
  data(){
    return{
      x: "XD",
      msg: [{message: "xD"},{message: "xDDD"},{message: "xDXDXD"},{message: "asdasdD"},{message: "asdasdasd"},]
    }
  },
  mounted() {
    const x = this.x
    this.socket = this.$nuxtSocket({
      name: "main",
    })

    /* Listen for events: */
    this.socket.on('method1', (x) => {
      alert(x)
      /* Handle event */
    })
  },
  methods: {
    method1() {
      const x = this.x
      console.log(this.socket)
      /* Emit events */
      this.socket.emit('method1', x)
        /* Handle response, if any */
    }
  }
}
</script>