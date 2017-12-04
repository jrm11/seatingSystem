<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
  @import "../assets/css/common_size";

  .header {
    height: $h58;
    line-height: $h58;
    margin-bottom: 30px;
  }

  .el-header {
    position: relative;
    padding: 0;
    line-height: $h58 !important;
    height: $h58 !important;
  }

  .btns {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .login-out {
    display: inline-block;
    width: $w-12;
    height: $w-12;
    margin-right: $mr5;
    background: url(../assets/img/login-out.png);
    vertical-align: middle;
  }

  /*下拉菜单*/
  .el-dropdown-menu {
    margin-top: 0;

    li {
      padding: 0 10px;
    }
  }

  .user-icon {
    width: $w-12;
    height: $w-12;
    display: inline-block;
    margin-right: $mr5;
    background: url(../assets/img/userManagement.png) center;
  }

</style>
<template>
  <!--头部组件-->
  <div class="header-bg">
    <el-header class="header clearfix">
      <router-link to="/index" class="fl">
        <img class="header-logo " src="../assets/img/logo.png" alt="logo">
      </router-link>
      <div class="btns">
        <el-button type="primary" @click="userManager"><i class="user-icon "></i>用户管理</el-button>
        <el-button type="primary" @click="showTrainCampDialog"><i class="el-icon-plus"></i>添加训练营</el-button>
        <el-dropdown split-button type="primary" trigger="click" class="ml10 mr10">
          {{name}}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="modifyPwd"><i class="el-icon-edit "></i>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut"><i class="login-out "></i>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="primary" v-if="state==1" :style="{display:'none'}"></el-button>
        <el-button type="primary" @click="back" v-else><i class="el-icon-arrow-left"></i>返回</el-button>
      </div>
    </el-header>
  </div>
</template>

<script>
  import Bus from '@/common/js/bus'
  export default {
    data () {
      return {
        name: "",
        state: null
      }
    },
    methods: {
      //用户管理
      userManager(){
        this.$router.push("/userManager")
      },

      //添加训练营
      showTrainCampDialog(){
        this.$router.push("/addTrainCamp")
      },

      //修改密码
      modifyPwd(){
        this.$router.push("/modifyPwd")
      },

      //退出登录
      loginOut() {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {}).then(function () {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(function () {
        });
      },

      //返回
      back(){
        this.$router.back(-1)
      }
    },

    mounted(){
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.name = user.username || '空';
      }
      this.state = this.$route.query.state;
    },
  }
</script>

