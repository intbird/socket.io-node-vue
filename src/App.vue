<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu ref="menu" id="menu"
                 mode="horizontal" @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#4299F0">

          <el-menu-item v-for="(item, index) in myApp.Menus"
                        :key="myApp.Key+index"
                        :index="myApp.Key+index">
            {{item.title}}
          </el-menu-item>

          <el-submenu index="100">
            <span slot="title">{{myBlog.title}}</span>
            <el-menu-item v-for="(item,index) in myBlog.Menus"
                          :key="myBlog.Key+index"
                          :index="myBlog.Key+index">
              {{item.title}}
            </el-menu-item>
          </el-submenu>

          <el-menu-item>
            <a href="https://intbird.net/intbird.html" target="_blank">我的简历</a>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import startWith from './utils/StringUtils'

  const axios = require('axios')
  export default {
    name: 'App',
    components: {},
    data () {
      return {
        myApp: {
          Key: '1-',
          title: 'app bar',
          Menus: [
            {title: '我的工作台', route: '/workbench'},
            {title: '进阶学习', route: '/knowledge'},
            {title: '我的开源', route: '/opensource'},
          ],
        },

        myBlog: {
          Key: '2-',
          title: '联系方式',
          Menus: [
            {title: 'CSDN', url: 'https://blog.csdn.net/intbird'},
            {title: 'Github', url: 'https://github.com/intbird'},
            {title: 'GitLab', url: 'https://gitlab.com/intbird'},
            {title: '微信: xudeyu'},
            {title: '钉钉: intbird'},
            {title: '抖音: xudeyu1991'},
            {title: '微信公众号: 许德雨'},
          ],
        },
      }
    },
    created () {
      this.addVisitor('app')
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
      getSelect (selectKeyPath, arrayKey, array) {
        if (startWith(selectKeyPath, arrayKey)) {
          const index = selectKeyPath.toString().replace(arrayKey, '')
          if (index >= 0 && index < array.length) {
            return array[index]
          }
        }
      },
      handleSelect (key, keyPath) {
        // app menu
        const appMenuItem = this.getSelect(key, this.myApp.Key, this.myApp.Menus)
        if (appMenuItem) {
          const routUrl = appMenuItem.route
          if (routUrl) {
            this.$router.push(routUrl)
          }
        }
        // contact menu
        const contactItem = this.getSelect(key, this.myBlog.Key, this.myBlog.Menus)
        if (contactItem) {
          const linkUrl = contactItem.url
          if (linkUrl) {
            window.open(linkUrl, '_blank')
          }
        }
      }
    },
  }
</script>

<style>
  #app {
    padding-top: 10px;
    padding-right: 10px;
    padding-left: 10px;

    display: flex;
    align-items: flex-start;
    text-align: center;
    flex-direction: column;
    justify-content: center;
  }

  #menu {
    width: 100%;
    margin-bottom: 20px;
    border: #606266;
  }
</style>
