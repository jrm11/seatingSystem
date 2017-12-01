<template>

  <div class="tac">

    <h1 class="title">矮油！ 页面没找到</h1>
    <el-button @click="backIndex" type="primary">返回首页</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      backIndex(){
        this.$router.push('/index');
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
  html,body{
    height:100%;
    margin:0;
    padding:0;
    background: #333;
  }
  .title{
    padding:100px 0;
    font-size: 40px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #333;
    font-weight: 600;
    text-shadow: 1px 1px 2px #000;
  }
</style>
