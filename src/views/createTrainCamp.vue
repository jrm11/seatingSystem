<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";

  .ml100 {
    margin-left: 100px;
  }
</style>
<template>
    <section class="container">
      <head-top></head-top>
      <section class="w">
        <el-form ref="trainCampForm" :model="trainCampForm" :rules="createRules">
          <el-form-item label="教 师 编 号：" label-width="110px" prop="tId">
            <el-input placeholder="教师编号" v-model="trainCampForm.tId"></el-input>
          </el-form-item>

          <el-form-item label="教 师 姓 名：" label-width="110px" prop="tName">
            <el-input placeholder="教师姓名" v-model="trainCampForm.tName"></el-input>
          </el-form-item>

          <el-form-item label="教 师 电 话：" label-width="110px" prop="tPhone">
            <el-input placeholder="教师电话" v-model.number="trainCampForm.tPhone"></el-input>
          </el-form-item>

          <el-form-item label="所属产品线：" label-width="110px" prop="tProductLine">
            <el-input placeholder="教师产品线" v-model="trainCampForm.tProductLine"></el-input>
          </el-form-item>

          <el-form-item label="班 级 人 数：" label-width="110px" prop="classNum">
            <el-input placeholder="班级人数" v-model.number="trainCampForm.classNum"></el-input>
          </el-form-item>
          <el-form-item label="创 建 时 间：" label-width="110px" prop="createTime">
            <el-date-picker type="date" placeholder="选择日期"
                            v-model="trainCampForm.createTime"
                            class="pct100"></el-date-picker>
          </el-form-item>
          <el-form-item class="ml100">
            <el-button type="primary" @click="saveSubmit" size="small">创建</el-button>
            <el-button type="default" @click="cancel" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </section>
    </section>
</template>

<script>
  import  headTop from '@/components/header.vue'
  import {createTrainCamp} from '@/api/api';
  export default {
    data () {
      let checkId = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('编号不能为空'));
        } else {
          callback();
        }
      };
      let checkName = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        } else {
          callback();
        }
      };
//
      let checkPhone = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (!/^1(3|4|5|8){9}$/.test(value)) {
          return callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      };
//
      let checkProductLine = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('产品线不能为空'));
        } else {
          callback();
        }
      };
      let checkClassNum = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('班级人数不能为空'));
        } else if (value > 25) {
          console.log(typeof value);
          return callback(new Error('班级人数不能大于教室座位数'));
        } else {
          callback();
        }
      };
      let checkCreateTime = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('时间不能为空'));
        } else {
          callback();
        }
      };
      return {
        trainCampForm: {
          tId: null,
          //教师姓名
          tName: "",
          //教师电话
          tPhone: "",
          //产品线
          tProductLine: "",
          //班级人数
          classNum: "",
          createTime: ""
        },
        createRules: {
          tId: [
            {validator: checkId, required: true, trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          tName: [
            {validator: checkName, required: true, trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          tPhone: [
            {validator: checkPhone, required: true, trigger: 'blur'},
            {min: 11, max: 11, message: '长度11个字符', trigger: 'blur'}
          ],
          tProductLine: [
            {validator: checkProductLine, required: true, trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          classNum: [
            {validator: checkClassNum, required: true, trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          createTime: [
            {validator: checkCreateTime, type: 'date', required: true, trigger: 'change'}
          ]
        }
      };
    },
    components: {
      headTop
    },
    methods: {
      saveSubmit(){
        let _this = this;
        _this.$refs.trainCampForm.validate(function (valid) {
          if (valid) {
            _this.$confirm('确认提交吗？', '提示', {}).then(function () {
              let para = Object.assign({}, _this.trainCampForm);
              createTrainCamp(para).then(function (res) {
                _this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                _this.$refs['trainCampForm'].resetFields();
                _this.$router.push("/index");
              })
              ;
            }).catch(function (res) {
              if (res == 'cancel') {
                _this.$message({
                  showClose: true,
                  message: "取消提交",
                  type: "info"
                });
              } else {
                _this.$message.error('错了哦，这是一条错误消息')
              }
            });
          }
        });
      },
      cancel(){
        this.$router.back(-1);
      }
    }
  }
</script>

