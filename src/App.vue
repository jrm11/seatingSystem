<template>
  <div id="app">
    <transition name="move" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return{
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  #app {
    height: 100%;
    background: #3b2f57;
  }

  .move-enter-active, .move-leave-active {
    transition: opacity .5s;
  }

  .move-enter, .move-leave {
    opacity: 0;
  }
</style>
