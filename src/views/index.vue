<style lang="scss" scoped rel="stylesheet/scss">
  @import "../assets/css/app";
</style>

<template>
  <div class="container">
    <head-top></head-top>
    <training-camp></training-camp>

  </div>
</template>
<script>
  import headTop from '@/components/header'
  import trainingCamp from '@/components/single-training-camp'
  import Bus from '@/common/js/bus'
  export default {
    data(){
      return {

      }
    },
    components: {
      headTop,
      trainingCamp,
    }
  }
</script>
