<template>
  <el-tabs type="border-card" class="root">
    <el-tab-pane label="当前消息">
      <div v-if="messageType === ShowType.text" name="message-panel">
        <pre name="overview">{{ message }}</pre>

        <div style="background-color: #E5E5E5;height: 1px;margin-top: 5px;margin-bottom: 10px"></div>
        <div class="op-message">
          <el-switch class="switch-db" active-color="#13ce66" inactive-color="#E5E5E5" v-model="switchLine"
                     active-text="换行"/>
        </div>
        <pre v-bind:class="this.switchLine?'pre-lines':'pre-line'">{{ showMessage }}</pre>
      </div>

      <div v-if="messageType === ShowType.image" name="message-panel">
        <el-image fit="contain" class="image" :src="showMessage"/>
      </div>

    </el-tab-pane>
    <el-tab-pane label="历史消息">
      <div name="message-panel">
        <ol>
          <li v-for="message in messages">
            <pre>{{ message }}</pre>
          </li>
        </ol>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  const ShowType = {
    text: 'text',
    image: 'image',
  };

  export default {
    name: 'SocketTack',
    data() {
      return {
        ShowType,

        messageType: ShowType.text,
        showMessage: '',

        message: '',
        messages: [],

        switchLine: false,
      }
        ;
    },
    sockets: {
      message: function (message) {
        this.parserMessageType(message);
        this.setMessage(message);
      },
      messages: function (messages) {
        this.setMessage(messages);
      },
    },
    methods: {
      setMessage(message) {
        this.message = message;
        this.messages.push(message);
        this.messages = this.messages.reverse();
      },

      parserMessageType: function (message) {
        if (typeof message === 'object') {
          if (message && message.message.indexOf('data:image/png;base64,') === 0) {
            this.showMessage = message.message;
            this.messageType = ShowType.image;
          } else {
            this.messageType = ShowType.text;
            this.showMessage = message.message;
          }
        }
        return message;
      }
    }
  }
</script>

<style scoped>

  .root {
    overflow: initial;
    width: 750px;
    height: 700px;
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
  }

  .pre-line {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 15px;
    color: #606266;
    overflow: scroll;
  }

  .pre-lines {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 15px;
    color: #606266;
    overflow: scroll;

    white-space: pre-wrap;
    word-wrap: break-word;
  }

  pre[name='overview'] {
    font-size: 10px;
    color: #606266;
    white-space: pre;
    min-height: 70px;
    max-height: 400px;
    overflow: scroll;
  }

  [name='message-panel'] {
    display: flex;
    flex-direction: column;
    white-space: pre;
    overflow: scroll;
    height: 635px;
  }

  .op-message {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .image {
    width: 600px;
    height: 600px;
  }

</style>
