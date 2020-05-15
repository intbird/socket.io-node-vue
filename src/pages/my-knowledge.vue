<template>
  <div class="root-layout"
       v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.2)">
    <div class="item" v-for="(groupParent, index) in knowledge" :key="groupParent.groupTitle+index">
      <span class="gp-title">{{groupParent.groupTitle}}</span>
      <el-row :gutter="8" class="item-card">
        <!-- all configs-->
        <div v-for="(groupChild, index) in groupParent.groupConfig" :key="groupChild.name+index">
          <el-button :class="[groupChild['childConfig']?'btn-title-child-title':'btn-title']"
                     type="info" style="margin-left: 1px"
                     v-on:click="cardClick(groupParent,groupChild)">{{groupChild.name}}
          </el-button>
        </div>

        <!-- one config in configs-->
        <transition name="el-zoom-in-top">
          <div ref="child" class="item-card-child"
               v-if="visibleExtend && groupParent['extend'] && groupParent['extend'].length>0">
            <div v-for="(extend, index) in groupParent['extend']"
                 :key="extend.name+index">
              <el-button class="btn-title-child-button" type="info" style="margin-left: 1px"
                         v-on:click="cardClick(groupParent,extend)">{{extend.name}}
              </el-button>
            </div>
          </div>
        </transition>
      </el-row>
    </div>
  </div>
</template>
<script>
  const axios = require('axios')

  export default {
    name: 'Knowledge',
    data () {
      return {
        loading: true,
        knowledge: [],
        visibleExtend: false,
      }
    },
    created () {
      this.queryConfigs()
    },
    methods: {
      openUrl (url) {
        window.open(url, '_blank')
      },
      queryConfigs () {
        axios.get(this.ConnectionUrl + '/knowledge')
          .then(response => {
            this.loading = false
            this.knowledge = response.data
          })
          .catch(function (error) {
            this.loading = false
            console.log('queryConfigs', error)
          })
          .finally(function () {
          })
      },
      checkGroupChild (groupChild) {
        return groupChild && groupChild['childConfig'] && groupChild['childConfig'].length > 0
      },
      cardClick (groupParent, item) {
        if (this.checkGroupChild(item)) {
          this.visibleExtend = !this.visibleExtend
          // 将子: childConfig 挂载到 父: extend
          // 清理之前的赋值
          this.knowledge.forEach((parentItem,index)=>{
            parentItem.extend = []
          })
          // 赋值到目标处
          this.$set(groupParent, 'extend', item['childConfig'])
        } else {
          this.openUrl(item.link)
          console.log(item.link)
        }
      }
    }
  }
</script>

<style scoped>
  .root-layout {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    min-width: 1268px;
    min-height: 800px;
  }

  .item {

    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .item-card {
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-bottom: 22px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(255, 255, 255, 0.05), 0 0 6px rgba(255, 255, 255, 0.1)
  }

  .gp-title {
    margin-top: 5px;
    color: #f3d19e;
    text-align: left;
  }

  .btn-title {
    background: #3333;
    margin-top: 15px;
    margin-right: 20px;
    margin-left: 1px;
  }

  .btn-title-child-title {
    background: #444444;
    margin-top: 15px;
    margin-right: 20px;
    margin-left: 1px;
  }

  .btn-title-child-button {
    background: #444444;
    margin-top: 15px;
    margin-right: 20px;
    margin-left: 1px;
  }

  .item-card-child {
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    padding-left: 20px;
    padding-bottom: 20px;
    margin-bottom: 22px;
    margin-top: 20px;
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2), 0 0 6px rgba(255, 255, 255, 0.4)
  }

</style>
