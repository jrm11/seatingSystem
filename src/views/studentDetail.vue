<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
  .student-detail{
    width:1000px;
    border-radius: 10px;
    height:600px;
    margin-bottom:50px;
  }
</style>
<template>
  <section class="container">
    <head-top></head-top>
    <section class="student-detail clearfix">
        <div class="fl">
              <seat-list></seat-list>
        </div>
        <div class="fl">
          <student-info></student-info>
        </div>
    </section>
  </section>
</template>

<script>
  import headTop from '@/components/header.vue'
  import seatList from '@/components/seatList.vue'
  import studentInfo from '@/components/studentInfo.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      headTop,
      seatList,
      studentInfo
    }
  }
</script>

