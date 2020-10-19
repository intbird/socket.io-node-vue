<template>
  <div class="root-layout">
    <el-row style="margin-top: 20px;position: fixed;bottom: 200px;left:120px">
      <el-button style="background: #444444;border: #4d5669" icon="el-icon-arrow-up" circle
                 onclick="window.scrollTo(0,0)"></el-button>
    </el-row>
    <el-container>
      <el-aside width="260px">
        <el-row class="menu-style">
          <el-col>
            <el-menu
              ref="menu"
              class="menu-layout"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"
              :unique-opened="true"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#397CC4">

              <div v-for="(item,index) in configs" :key="index">
                <SubMenuGroup v-if="item.menus" :menu-config="item" :menu-index="index+''"/>
                <SubMenuSingle v-else :menu-config="item" :menu-index="index+''"/>
              </div>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="markdown">
        <mavon-editor style="min-height: 600px" defaultOpen="preview" :subfield="false" v-model="markdownContent"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import SubMenuGroup from '../components/summenu/SubMenuGroup'
  import SubMenuSingle from '../components/summenu/SubMenuSingle'

  const axios = require('axios')
  const Base64 = require('js-base64').Base64

  export default {
    name: 'OpenSourcePage',
    components: {SubMenuGroup, SubMenuSingle},
    data () {
      return {
        loading: true,
        markdownContent: '##### markdown preview 点击右上方小眼睛切换 `编辑/预览`',
        configs: [
          {
            icon: 'el-icon-lock',
            title: '部分改造经历',
            menus: [],
          },
          {
            icon: 'el-icon-dish',
            title: '部分快捷代码',
            menus: [],
          },
          {
            icon: 'el-icon-s-promotion',
            title: 'SocketIO Control',
            menus: [
              {title: 'online', url: 'https://intbird.net/#/socketio'},
              {title: 'server', url: 'https://github.com/intbird/SocketIOControl-Server'},
              {title: 'android', url: 'https://github.com/intbird/SocketIOControl-Android'},
            ]
          },
          {
            icon: 'el-icon-upload',
            title: 'Maven Publish',
            url: 'https://github.com/intbird/maven-publish',
          },
          {
            icon: 'el-icon-video-play',
            title: 'Media Player',
            menus: [
              {title: '实现介绍', url: 'https://blog.csdn.net/intbird/article/details/105970536'},
              {title: '开源发布', url: 'https://github.com/intbird/VideoPlayerLib'},
            ]
          }, {
            icon: 'el-icon-house',
            title: 'This Website',
            url: 'https://github.com/intbird/maven-publish',
          },
          {
            title: 'developing...',
          },
        ]
      }
    },
    created () {
      this.queryConfigs()
      this.addVisitor('opensrouce')
    },
    methods: {
      addVisitor (from) {
        axios.get(this.ConnectionUrl + '/visitor?from=' + from)
          .then(function (response) {
            console.log('thanks 访问 +1')
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      queryConfigs () {
        // open source
        axios.get(this.ConnectionUrl + '/openSource')
          .then(response => {
            this.loading = false
            this.configs[0].menus = response.data
          })
          .catch(function (error) {
            this.loading = false
          })
          .finally(function () {
          })

        // simple code
        axios.get(this.ConnectionUrl + '/simpleCode')
          .then(response => {
            this.loading = false
            this.configs[1].menus = response.data
          })
          .catch(function (error) {
          })
          .finally(function () {
          })
      },
      setDefaultUI () {
        this.$refs.menu.close()
        this.markdownContent = ''
      },
      handleOpen (key, keyPath) {
        console.log('ffff' + key + ' ' + keyPath)
      },
      handleSelect (key, keyPath) {

        // SubMenu :index="menuIndex+'-'+index"
        if (key.indexOf('-') === -1) {
          const itemIndex = parseInt(key)
          const item = this.configs[itemIndex]
          if (item.url) {
            window.open(item.url, '_blank')
          }
        } else {
          const indexArray = key.split('-')
          const itemIndex = parseInt(indexArray[0])
          const menuIndex = parseInt(indexArray[1])
          // menu  { icon: '', title: '', url: '', menus:[ id:'', title:'', markdown:"",url:"" ]}
          const item = this.configs[itemIndex]
          if (item.url) {
            window.open(item.url, '_blank')
          } else if (item.menus) {
            const menuItem = item.menus[menuIndex]
            if (menuItem.url) {
              window.open(menuItem.url, '_blank')
            } else if (menuItem.markdown) {
              this.markdownContent = Base64.decode(menuItem.markdown)
            }
          }
        }
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>

<style scoped>

  .root-layout {
    display: flex;
  }

  .menu-style {
  }

  .menu-layout {
    align-items: flex-start;
    text-align: left;
    border: #515a6e
  }

  .group-title {
    color: #C5C5C5;
  }

  .markdown {
    padding-top: 0;
    padding-right: 0;
    min-width: 800px;
    min-height: 800px;
  }

</style>
