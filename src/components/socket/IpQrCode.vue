<template>
  <div class="root">
    <a :href="'https://github.com/intbird/SocketIOControl-Android'" target="_blank">Download Client Demo</a>

    <img class="image" :src="qrImage" v-on:click="getIp()"/>
    <el-autocomplete
      class="text"
      v-model="qrText"
      placeholder="请输入局域网ip"
      :fetch-suggestions="querySearch"
      @select="showQRCode"
      clearable/>
    <Table height="400" width="200" :columns="tableTitle" :data="tableData" stripe></Table>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import getUserIP from '../../utils/IPAddress'

  export default {
    name: "QRCode",
    data() {
      return {
        qrText: 'intbird.net:996',
        qrImage: '',

        tableTitle: [{
          title: '连接标示',
          key: 'id',
          ellipsis: 'true',
        }, {
          title: '状态',
          key: 'connect',
          ellipsis: 'true',
        }],
        tableData: [],
      };
    },
    created() {
      this.getIp();
      this.showQRCode();
    },
    sockets: {
      trackFlow: function (result) {
        if (result && result.id && result.id.length) {
          this.tableData = this.tableData.filter(function (item) {
            return item.id !== result.id;
          });
          this.tableData.push(result);
        }
      },
    },
    methods: {
      getIp() {
        getUserIP(ip => {
          this.qrText = ip;

          this.showQRCode();
        });
      },
      showQRCode() {
        QRCode.toDataURL(this.wrapInputIp(this.qrText))
          .then(ip => {
            this.qrImage = ip;
          })
          .catch(err => {
            console.error(err)
          });
      },
      wrapInputIp(ip) {
        return "socketio://" + ip;
      },
      querySearch(queryString, cb) {
        const result = [
          {"value": "intbird.net"},
        ];
        cb(result);
        this.showQRCode();
      },
    }
  }
</script>

<style scoped>
  .root {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .image {
    width: 200px;
    height: 200px;
  }

  .text {
    margin-bottom: 20px;
    width: 151px;
  }
</style>
