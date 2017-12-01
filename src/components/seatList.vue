<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
  .active {
    outline: 2px solid #474cff;
  }

  /*座位列表*/
  .seat-list {
    width: 700px;
    background: #6ab7ff;
    height: 600px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 30px 20px;

    /*座位列表标题*/
    .title {
      margin-bottom: 20px;
      color: #fff;
      font-size: 26px;
      font-weight: normal;
    }

    /*单个座位*/
    .seat {
      position: relative;
      z-index: 0;
      width: 90px;
      height: 60px;
      line-height: 60px;
      background: #fff;
      /*border-radius: 4px;*/
      transition: .3s;
      box-shadow: 0 5px 20px -4px #3b7eff;
      cursor: pointer;
      color: #f9f9f9;
      overflow: hidden;
    }

    .seat:hover {
      cursor: pointer;
      box-shadow: none;
    }

    /*学生姓名*/
    .student-name {
      color: #fff;
    }

    li {
      float: left;
      margin: 0 15px 15px 15px;
    }

    /*第2 7 12 17 22 个 li 标签的右边距 */
    li:nth-of-type(5n-3) {
      margin-right: 60px;
    }

    .student-name {
      height: 22px;
      line-height: 22px;
      margin-top: 4px;
    }
  }
</style>

<template>
  <section class="seat-list clearfix tac">
    <h1 class="title">座位表</h1>
    <ul>
      <li v-for="(item,index) in studentInfoList">
        <div @click="addStyle(item.sId,item.name,index)" :class="{'active':isActive==index}">
          <!--判断如果是空位背景色为白色-->
          <div class="seat" :style="{background:bg}" v-if="item.name==' '"></div>
          <div class="seat" :style="{background:'#00cccc'}" v-else>已订座</div>
        </div>
        <p class="student-name">{{item.name}}</p>
      </li>
    </ul>
  </section>
</template>
<script>

  import {getStudentInfo} from '@/api/api';
  import Bus from '@/common/js/bus'
  export default {
    data () {
      return {
        studentInfoList: [],
        bg: "",
        flag: true,
        isActive: 0,
      }
    },
    methods: {
      addStyle(sid, name, index){
        var _this = this;
//        点击座位传递 sid 到学生详情列表
        Bus.$emit('sid', sid, name);
        this.isActive = index;
        if(name == ' '){
          setTimeout(function () {
            _this.$confirm('当前没有信息', '提示', {
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          },1000)
        }
      },
      /*
       *   显示点击的训练营的信息
       * */
      getStudentDetail(){
        let _this = this;
//        获取训练营的id
        let id = this.$route.query.id;
        let para = {sId: id};
        getStudentInfo(para).then(function (res) {
          _this.studentInfoList = res.data.studentInfoList;
        });
      }
    },
    mounted(){
      this.getStudentDetail();
    }
  }
</script>

