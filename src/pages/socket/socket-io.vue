<template>
  <div class="socket-panel">
    <ip-qr-code></ip-qr-code>
    <socket-message></socket-message>
    <socket-io></socket-io>
  </div>
</template>

<script>
  import IpQrCode from '../../components/socket/IpQrCode'
  import SocketIo from '../../components/socket/SocketIO'
  import SocketMessage from '../../components/socket/SocketMessage'

  export default {
    name: "SocketIOPage",
    components: {
      IpQrCode,
      SocketIo,
      SocketMessage,
    },
  }
</script>

<style scoped>
  .socket-panel {
    padding: 20px;
    background: white;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>
