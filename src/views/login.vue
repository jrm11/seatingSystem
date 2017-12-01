<style lang="scss" rel="stylesheet/scss">
  @import "../assets/css/app";

  .btn-login {
    width: 100%;
    margin-top: 10px;
  }

  .login-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px;
    border-radius: 10px;
    background: #fff;
  }

  .login-logo {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .forget-pwd {
    display: block;
    font-size: 12px;
    margin-top: 30px;
    text-align: right;
  }
</style>
<template>
  <div>
    <vue-particles color="#409EFF" class="particle">
    </vue-particles>
    <div class="login-container">
      <h2 class="tac">登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="账号:" prop="username">
          <el-input v-model="loginForm.username" placeholder="输入账号：admin"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="输入密码:123456"></el-input>
        </el-form-item>
        <router-link to="/" class="forget-pwd">忘记密码?</router-link>
        <el-button type="primary" @click="login" class="btn-login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {userLogin} from '@/api/api'
  export default {
    data() {
      var username = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var password = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {validator: username, trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {validator: password, trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var loginParams = {username: this.loginForm.username, password: this.loginForm.password};
            userLogin(loginParams).then(data => {
              //将服务器返回的数据赋值给每个变量
              let {msg, code, user} = data;
              if (code == 500) {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({path: '/index', query: {state: 1}});
              }
            });
          } else {
            this.$message({
              showClose: true,
              message: '账号或密码不能为空',
              type: 'error'
            });
            return false;
          }
        });
      },
    },
  }
</script>
