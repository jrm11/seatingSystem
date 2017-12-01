<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";

  $t-2: 0.2s;
  $t-4: 0.4s;
  $h100: 100px;
  $h200: 200px;
  $pct100: 100%;
  $cfff: #fff;
  $size: 10px;
  $linear: linear;
  $ease-in-out: ease-in-out;
  $all: all;
  @mixin border-t-r {
    border-top-left-radius: $size;
    border-top-right-radius: $size;
  }

  @mixin border-b-r {
    border-bottom-left-radius: $size;
    border-bottom-right-radius: $size;
  }

  .training-camp:hover {
    box-shadow: 2px 4px 8px 0 rgba(46, 61, 73, 0.2);
  }

  .training-camp {
    float: left;
    width: $pct100;
    position: relative;
    border-radius: 10px;
    margin-bottom: 40px;
    transition: .3s;
    box-shadow: 0 0 10px 0 rgba(46, 61, 73, 0.2);

    .teacher {
      position: absolute;
      height: $h200;
      width: $pct100;
      left: 0;
      top: 0;
      z-index: 1;
      @include border-t-r;
      color: $cfff;
      -moz-transition: $all $t-4 $ease-in-out;
      -o-transition: $all $t-4 $ease-in-out;
      -webkit-transition: $all $t-4 $ease-in-out;
      transition: $all $t-4 $ease-in-out;
    }

    .training-camp-img {
      width: $pct100;
      height: $h200;
      line-height: $h200;
      overflow: hidden;
      @include border-t-r;
      transition: $all $t-4 $linear;
      -moz-transition: $all $t-4 $linear;
      -o-transition: $all $t-4 $linear;
      -webkit-transition: $all $t-4 $linear;
      text-align: center;
      letter-spacing: 2px;
      font-size: 24px;
      color: $cfff;
      opacity: 0.9;
    }

    .teacher-info {
      padding-left: 30px;
      padding-top: 30px;
      opacity: 0;
      -moz-transition: $all $t-2 $ease-in-out;
      -o-transition: $all $t-2 $ease-in-out;
      -webkit-transition: $all $t-2 $ease-in-out;
      transition: $all $t-2 $ease-in-out;
    }

    .teacher-item {
      line-height: 26px;
    }

    .training-camp-title {
      position: relative;
      width: $pct100;
      height: $h100;
      line-height: $h100;
      padding-left: 20px;

      @include border-b-r;
      background: $cfff;

      .action {
        position: absolute;
        right: 10px;
        top: 0;
        opacity: 0;
        -moz-transition: $all $t-2 $ease-in-out;
        -o-transition: $all $t-2 $ease-in-out;
        -webkit-transition: $all $t-2 $ease-in-out;
        transition: $all $t-2 $ease-in-out;
      }

      h3 {
        line-height: $h100;
        color: #333;
      }
    }
  }

  .training-camp:hover .teacher {
    cursor: pointer;
    opacity: 1;
    background: rgba(0, 153, 255, 0.6);
  }

  .training-camp:hover .teacher-info, .training-camp:hover .action {
    opacity: 1;
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -moz-transition-delay: $t-2;
    -o-transition-delay: $t-2;
    -webkit-transition-delay: $t-2;
    transition-delay: $t-2;
  }

  .s-training-camp {
    ul {
      li {
        width: 320px;
        margin-right: 20px;
      }
      li:nth-of-type(3n) {
        margin-right: 0;
      }
    }
  }

  /*时间输入框的宽度*/
  .timeW {
    width: $pct100;
  }

</style>
<template>
  <section>
    <!--训练营组件-->
    <div class="s-training-camp">
      <ul class="clearfix">
        <li class="training-camp" @click="studentDetail(item.tId)"
            v-for="(item,index) in mockTrainCampList" key="index">
          <!--:style="{background:'item.bg'}"此此写法错误-->
          <div class="training-camp-img" :style="{background:item.bg}">{{item.tProductLine}}训练营</div>
          <div class="training-camp-title">
            <h3 class="tal">{{item.tProductLine}}</h3>
            <div class="action">
              <el-button-group>
                <el-button @click.stop="btnEditTrainCamp(item)" type="primary" size="small"><i
                  class="el-icon-edit mr5"></i>编辑
                </el-button>
                <el-button @click.stop="btnDelTrainCamp(item,index)" type="danger" size="small"><i
                  class="el-icon-delete mr5"></i>删除
                </el-button>
              </el-button-group>
            </div>
          </div>
          <div class="teacher">
            <div class=" teacher-info tal">
              <div class="teacher-item">
                <span class="">讲 师 编 号：</span>
                <span class="">{{item.tId}}</span>
              </div>
              <div class="teacher-item">
                <span class="">讲 师 姓 名：</span>
                <span class="">{{item.tName}}</span>
              </div>
              <div class="teacher-item">
                <span class="">讲 师 电 话：</span>
                <span>{{item.tPhone}}</span>
              </div>
              <div class="teacher-item">
                <span class="">所属产品线：</span>
                <span>{{item.tProductLine}}</span>
              </div>
              <div class="teacher-item">
                <span class="">创 建 时 间：</span>
                <span>{{item.createTime}}</span>
              </div>
              <div class="teacher-item">
                <span class="">班 级 人 数：</span>
                <span>{{item.classNum}}人</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!--编辑训练营dialog-->
    <el-dialog
      title="编辑训练营"
      :visible.sync="editTrainCampShow"
      width="30%" v-model="editDialogId">
      <el-form :model="editTrainCampForm" label-width="80px" ref="editTrainCampForm" :rules="editForm">
        <el-form-item label="教 师 编 号：" label-width="110px" prop="tName">
          <el-input placeholder="教师编号" v-model="editTrainCampForm.tId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="教 师 姓 名：" label-width="110px" prop="tName">
          <el-input placeholder="教师姓名" v-model="editTrainCampForm.tName"></el-input>
        </el-form-item>

        <el-form-item label="教 师 电 话：" label-width="110px" prop="tPhone">
          <el-input placeholder="教师电话" v-model="editTrainCampForm.tPhone"></el-input>
        </el-form-item>

        <el-form-item label="所属产品线：" label-width="110px" prop="tProductLine">
          <el-input placeholder="教师产品线" v-model="editTrainCampForm.tProductLine"></el-input>
        </el-form-item>

        <el-form-item label="班 级 人 数：" label-width="110px" prop="classNum">
          <el-input placeholder="班级人数" v-model="editTrainCampForm.classNum"></el-input>
        </el-form-item>
        <el-form-item label="创 建 时 间：" label-width="110px" prop="createTime">
          <el-date-picker type="date" placeholder="选择日期" class="timeW"
                          v-model="editTrainCampForm.createTime"></el-date-picker>
        </el-form-item>

        <el-form-item class="tar">
          <el-button  @click="cancel">取消</el-button>
          <el-button type="primary" @click="saveSubmit" >保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>
<script>
  import  Vue from 'vue'
  import {getTrainCampList, editTrainCamp, delTrainCamp} from '@/api/api';
  import util from '@/common/js/util'
  let bus = new Vue();
  export default {
    data () {
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
        editDialogId: 0,
        mockTrainCampList: [],
        editTrainCampShow: false,
        editTrainCampForm: {
          tName: "",
          tPhone: "",
          tProductLine: "",
          classNum: "",
          createTime: "",
        },
        editForm: {
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
            {min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur'}
          ],
          createTime: [
            {validator: checkCreateTime, type: 'date', required: true, trigger: 'change'}
          ]
        }
      }
    },
    methods: {
//      获取训练营信息
      getTrainCamp(){
        let para = {};
        getTrainCampList(para).then((res)=> {
          this.mockTrainCampList = res.data.mockTrainCampList;
        })
      },
      saveSubmit(){
        let _this = this;
        this.$refs.editTrainCampForm.validate(function (valid) {
          if (valid) {
            _this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let para = Object.assign({}, _this.editTrainCampForm);
              para.createTime = (!para.createTime || para.createTime == '') ? '' : util.formatDate.format(new Date(para.createTime), 'yyyy-MM-dd');
              editTrainCamp(para).then((res) => {
                _this.$message({
                  message: '编辑成功',
                  type: 'success'
                });

                //修改后重新获取训练营信息
                _this.getTrainCamp();
                _this.$refs['editTrainCampForm'].resetFields();
                _this.editTrainCampShow = false;
              });
            });
          }
        })
      },
      cancel(){
        let _this = this;
        _this.editTrainCampShow = false;
      },
      //编辑训练营
      btnEditTrainCamp(item){
        //接收训练营组件的所有数据
        bus.$emit("editDialog", item);
        this.editTrainCampShow = true;
        this.editTrainCampForm = Object.assign({}, item);
      },
      //删除训练营
      btnDelTrainCamp(item, index){
        //接收训练营组件的所有数据
        bus.$emit("delDialog", item);
        this.$confirm('确认删除此训练营?', '提示', {
          type: 'warning'
        }).then(() => {
          var _this = this;
          let para = {tId: item.tId};
          delTrainCamp(para).then(res=> {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          });
          var _this = this;
          _this.mockTrainCampList.splice(index, 1);
        }).catch((res) => {

        });
      },
      studentDetail(id){
        this.$router.push({path: 'studentDetail', query: {id: id}});
//        this.$router.push({name:'studentDetail',params:{id:id}});
      }
    },
    mounted(){
      this.getTrainCamp();
    },
    created(){
      bus.$on("editDialog", function (msg) {
        this.editDialogId = msg;
//        alert("id="+msg);
      })
    }
  }
</script>

