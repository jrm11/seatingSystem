<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app.scss";

  .el-form-item {
    margin-bottom: 10px;
  }

  $w-170: 170px;
  .student-info {
    width: 300px;
    background: #fff;
    height: 600px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 30px 20px;
    .el-form-item__label {
      width: 100px;
    }
    .title {
      margin-bottom: 20px;
      color: #333;
      font-size: 26px;
      font-weight: normal;
      text-align: center;
    }

    .el-input, .el-select {
      float: right;
      width: $w-170;
    }

    .no-data {
      text-align: center;
      margin-top: 200px;
      font-size: 24px;
    }
  }

  /*修改element-ui el-select 宽度 与此页面的input  宽度一致*/
  .el-select {
    width: $w-170;
  }
</style>

<template>
  <!--学生信息组件-->
  <section class="student-info">
    <h1 class="title">学生信息</h1>
    <div v-for="list in studentDInfo">
      <div v-if="list.name !==' '">
        <el-form :model="list" ref="list">
          <el-form-item label="座位编号：">
            <el-input size="mini" placeholder="请输入座位编号" :disabled="disabled" v-model="sId"></el-input>
          </el-form-item>

          <el-form-item label="学员姓名：">
            <el-input size="mini" placeholder="请输入学员姓名" :disabled="isTrue" v-model="name"></el-input>
          </el-form-item>

          <el-form-item label="最高学历：">
            <el-select v-model="list.education" placeholder="请选择学员学历" clearable size="mini" :disabled="isTrue">
              <el-option
                v-for="item in optionsEducation"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所学专业：">
            <el-input size="mini" placeholder="请输入学员专业" :disabled="isTrue" v-model="list.professional"></el-input>
          </el-form-item>

          <el-form-item label="有无基础：">
            <el-select v-model="list.isPrimary" placeholder="请选择" clearable size="mini" :disabled="isTrue">
              <el-option
                v-for="item in optionsPrimary"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="信息来源：">
            <el-input size="mini" placeholder="请输入信息来源" :disabled="isTrue" v-model="list.sourceMsg"></el-input>
          </el-form-item>

          <el-form-item label="面资情况：">
            <el-input size="mini" placeholder="请输入面资情况" :disabled="isTrue" v-model="list.situation"></el-input>
          </el-form-item>

          <el-form-item label="学习时长：">
            <el-date-picker
              v-model="list.time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              size="mini"
              :disabled="isTrue">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="学习阶段：">
            <el-select v-model="list.stage" placeholder="请选择学习阶段" clearable size="mini" :disabled="isTrue">
              <el-option
                v-for="item in optionsStage"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="tac">
            <el-button type="primary" size="small" @click="changeStatus" v-text="btnEdit"
                       v-if="btnEdit=='编辑'"></el-button>
            <el-button type="primary" size="small" @click.native="editSeat" v-text="btnEdit"
                       v-else></el-button>
            <el-button type="danger" size="small" @click="cancelSeat">取消订座</el-button>
          </div>
        </el-form>
      </div>
      <div class="no-data" v-else>暂无数据</div>
    </div>
  </section>
</template>

<script>
  import Bus from '@/common/js/bus'
  import util from '@/common/js/util'
  import {getStudentInfoD, modifyStudentInfo, delStudentInfo, addStudentInfo} from '@/api/api'
  export default {
    data () {
      return {
//        表单状态
        isTrue: true,
        flag: true,
//        禁用
        disabled: true,
        //学历
        optionsEducation: [
          {
            value: '1',
            label: '高中以下'
          },
          {
            value: '2',
            label: '高中'
          },
          {
            value: '3',
            label: '大专'
          },
          {
            value: '4',
            label: '本科'
          }, {
            value: '5',
            label: '本科以上'
          },

        ],
        //阶段
        optionsStage: [
          {
            value: '1',
            label: '第1阶段'
          },
          {
            value: '2',
            label: '第2阶段'
          },
          {
            value: '3',
            label: '第3阶段'
          },
          {
            value: '4',
            label: '第4阶段'
          }
        ],
        //是否有基础
        optionsPrimary: [
          {
            value: '1',
            label: '有基础'
          }, {
            value: '2',
            label: '无基础'
          }
        ],
        educationVal: "",
        stageVal: "",
        primaryVal: "",
        studentDInfo: [],
        sId: null,
        name: "",
        btnEdit: "编辑",
        list: {
          sId: 0,
          name: '',
          teacherName: '',
          education: '',
          professional: '',
          isPrimary: '',
          sourceMsg: '',
          situation: '',
          time: '',
          stage: ''
        }
      }
    },
    methods: {
      changeStatus(){
        if (this.flag) {
          this.isTrue = false;
          this.flag = false;
          this.btnEdit = "保存"
        } else {
          this.isTrue = true;
          this.flag = true;
          this.btnEdit = "编辑"
        }
      },
//      修改座位信息
      editSeat(){
      },
//      删除座位
      cancelSeat(){
        var _this = this;
        this.$confirm('确认删除该座位?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {sId: _this.sId};
          delStudentInfo(para).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          });
        }).catch(() => {
        });
      },
      getStudentD(){
        var self = this;
        let para = {sId: self.sId};
        getStudentInfoD(para).then(function (res) {
          self.studentDInfo = res.data.studentDInfo;
        });
      }
    },
    created(){
      var self = this;
      //接收点击座位后的 id
      Bus.$on('sid', function (sid, name) {
        self.sId = sid;
        self.name = name;
      });
    },
    mounted(){
      this.getStudentD();
    },
    watch: {
      //监听seatList.vue组件传过来的id的变化
      sId(){
        var _this = this;
        _this.getStudentD();
      },
      name(){
        var _this = this;
        _this.getStudentD();
      }
    }
  }
</script>
