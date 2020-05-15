<template>
  <div class="root">
    <div class="user-info">
      <el-avatar fit="cover" src="../../../static/images/head.jpg"></el-avatar>
      <el-input class="identifyId" v-model="identifyId" placeholder="入库的唯一识别码"></el-input>
    </div>
    <div style="margin-left: 55px;margin-right: 25px">
      <el-input class="textarea" :rows="4" v-model="textArea" type="textarea" placeholder="发送消息到所有客户端"></el-input>
      <div class="send-message">
        <el-button v-if="false" type="primary" class="button" v-on:click="sendMessage(textArea)">发送消息</el-button>
        <el-button type="primary" class="button" v-on:click="broadcastMessage(textArea)">广播消息</el-button>
      </div>
    </div>

    <el-collapse class="collapse-more">
      <el-collapse-item title="数据操作">
        <el-input class="textarea" :rows="2" v-model="textQuery" type="textarea" placeholder="模糊查询关键字"></el-input>
        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="queryMessage()">查询我所有消息</el-button>
          <el-button type="primary" class="button" v-on:click="queryMessageLike(textQuery)">模糊查所有消息</el-button>
        </div>
        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="deleteMessage(true)">删我一条</el-button>
          <el-button type="primary" class="button" v-on:click="deleteMessage(false)">删我所有</el-button>
          <el-button disabled type="primary" class="button" v-on:click="deleteMessageLike()">删 库</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item title="复制操作">
        <el-input class="textarea" :rows="2" v-model="textClipboard" type="textarea" placeholder="发送到粘贴板的内容"></el-input>
        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="clipboardSet(textClipboard)">推到手机粘贴板</el-button>
          <el-button type="primary" class="button" v-on:click="clipboardGet()">获取手机粘贴板</el-button>
        </div>

        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="copyCurrentMessage(message)">复制当前显示区</el-button>
        </div>
      </el-collapse-item>

      <el-collapse-item title="页面操作">
        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="screenShot()">截取手机屏幕</el-button>

        </div>
        <div class="more-item-wrapper">
          <el-button type="primary" class="button" v-on:click="activitySet(textClipboard)">页面信息-待实现</el-button>
          <el-button type="primary" class="button" v-on:click="activityGet()">页面信息-待实现</el-button>
        </div>
      </el-collapse-item>

    </el-collapse>

    <el-drawer
      title="帮助"
      :visible.sync="drawerHistory"
      direction="rtl">
      <div>空的</div>
    </el-drawer>

  </div>
</template>

<script>
  import {clientUri, remoteUri} from '../../const/socket-uri';
  import clipboard from 'clipboard-js';

  export default {
    name: 'SocketIO',
    data() {
      return {
        identifyId: 'intbird',
        message: 'intbird',

        textArea: '',
        textQuery: '',
        textClipboard: '',

        drawerHistory: false,
        base64Img: '',
      };
    },
    sockets: {
      connect: function (args) {
        console.log('connect', args);
      },
      message: function (message) {
        this.message = message;
        this.parserMessage(message);
      },
      messages: function (messages) {
        this.message = messages;
      },
      disconnect: function (args) {
        console.log('disconnect', args);
      },
    },
    methods: {
      parserMessage(message) {
        if (message && message.uri) {
          switch (message.uri) {
            case clientUri.screenshot:
              this.base64Img = message.message;
              break;
            case clientUri.clipboardGet:
              this.textClipboard = message.message;
              break;
          }
        }
      },

      sendMessage: function (data) {
        this.$socket.emit('message', {identifyId: this.identifyId, message: data})
      },
      broadcastMessage: function (data) {
        this.$socket.emit('message', {identifyId: this.identifyId, message: data})
      },
      copyCurrentMessage: function (data) {
        clipboard.copy(`${JSON.stringify(data)}`);
      },

      queryMessage: function () {
        this.$socket.emit('query', {identifyId: this.identifyId})
      },
      deleteMessage: function (justOne) {
        if (justOne) {
          this.$socket.emit('deleteOne', {identifyId: this.identifyId})
        } else {
          this.$alert('确定要删吗', '删除我的数据', {
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'confirm') {
                this.$socket.emit('deleteMany', {identifyId: this.identifyId})
                this.$message({
                  type: 'info',
                  offset: 50,
                  message: `我的消息已经删除`
                });
              }
            }
          });
        }
      },
      queryMessageLike: function (data) {
        this.$socket.emit('queryLike', {message: {$regex: data, $options: '$i'}});
      },
      deleteMessageLike: function () {
        this.$alert('确定要删库跑路吗', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.$socket.emit('deleteMany', {})

              this.$message({
                type: 'info',
                offset: 50,
                message: `消息已经删除`
              });
            }
          }
        });
      },

      clipboardSet: function (data) {
        this.$socket.emit('message', {
          identifyId: this.identifyId,
          uri: remoteUri.clipboardSet + '?value=' + encodeURIComponent(data)
        })
      },
      clipboardGet: function () {
        this.$socket.emit('message', {
          identifyId: this.identifyId,
          uri: remoteUri.clipboardGet,
        })
      },

      screenShot: function () {
        this.$socket.emit('message', {
          identifyId: this.identifyId,
          uri: remoteUri.screenshot,
        });
      },
      activitySet: function (data) {
        this.$socket.emit('message', {
          identifyId: this.identifyId,
          uri: remoteUri.clipboardGet + '?value=' + encodeURIComponent(data)
        })
      },
      activityGet: function () {
        this.$socket.emit('message', {
          identifyId: this.identifyId,
          uri: remoteUri.clipboardGet,
        })
      },
    }
  }
</script>

<style scoped>
  .root {
    width: 400px;
    flex-direction: column;
    text-align: left;
    display: flex;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin: 5px;
  }

  .identifyId {
    margin-left: 10px;
    width: fit-content;
  }

  .textarea {
    text-align: left;
    font-size: 16px;
    margin-right: 10px;
  }

  .button {
  }

  .send-message {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .collapse-more {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 18px;
  }

  .more-item {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .more-item-wrapper {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    justify-content: flex-start;
  }

</style>
