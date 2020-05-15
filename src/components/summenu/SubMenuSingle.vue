<template>
  <el-menu-item :index="menuIndex">
    <i :class="menuConfig.icon"></i><a class="menu-title">{{menuConfig.title}}</a>
  </el-menu-item>
</template>

<script>
  export default {
    name: 'SubMenuItem',
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
