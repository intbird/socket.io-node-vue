<template>
  <el-submenu :index="menuIndex">
    <template slot="title">
      <i :class="menuConfig.icon"></i>
      <span class="menu-title">{{menuConfig.title}}</span>
    </template>
    <el-menu-item-group v-if="menuConfig.menus&&menuConfig.menus.length>0">
      <el-menu-item v-for="(menu,index) in menuConfig.menus"
                    :index="menuIndex+'-'+index"
                    :key="menuIndex+'-'+index">
        {{menu.title}}
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
  export default {
    name: 'SubMenuGroup',
    props: {
      menuIndex: String,
      menuConfig: Object,
    }
  }
</script>

<style scoped>
  .menu-title {
    color: #C5C5C5;
  }
</style>
