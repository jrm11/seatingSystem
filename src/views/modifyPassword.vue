<style scoped lang="scss" rel="stylesheet/scss">
  @import "../assets/css/app";

  .el-dialog__title, .el-icon-close:before {
    color: #9c9c9c;
  }
</style>
<template>
  <div class="container">
    <head-top></head-top>
    <div class="w">
      <h2 class="tac">修改密码</h2>
      <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="pwdForm.oldPwd" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="newPwd">
          <el-input v-model="pwdForm.newPwd" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="pwdForm.confirmPwd" auto-complete="off" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item class="mt30">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import headTop from '@/components/header.vue'

  //  import {modifyPassword} from '@/api/api';
  export default {
    data() {
      var checkOldPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        } else {
          callback();
        }
      };
      var validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.pwdForm.confirmPwd !== '') {
            this.$refs.pwdForm.validateField('confirmPwd');
          }
          callback();
        }
      };
      var validateConfirmPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        pwdForm: {
          newPwd: '',
          confirmPwd: '',
          oldPwd: ''
        },
        rules: {
          newPwd: [
            {validator: validateNewPwd, trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          confirmPwd: [
            {validator: validateConfirmPwd, trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          oldPwd: [
            {validator: checkOldPwd, trigger: 'blur'}
          ]
        }
      };
    },
    components: {
      headTop
    },

    methods: {
      submitForm() {
        var _this = this;
        this.$refs.pwdForm.validate((valid) => {
          if (valid) {
            let modifyParams = {password: _this.pwdForm.oldPwd, newPwd: _this.pwdForm.newPwd};
            modifyPassword(modifyParams).then(data => {
              let {msg, code} = data;//es6解构语法
              if (code == 200) {
//                // 弹出错误提示条
                this.$message({
                  message: msg,
                  showClose: true,
                  type: 'success'
                });
              }
              this.$router.push('/index');
            });
          } else {
            if (code == 500) {
//                // 弹出错误提示条
              this.$message({
                message: msg,
                type: 'waring'
              });
            }
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.pwdForm.resetFields();
      }
    }
  }
</script>
