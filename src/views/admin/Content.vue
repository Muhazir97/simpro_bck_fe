<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script>
  export default {}
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */

  {
    opacity: 0
  }

  .scroll{
    height: 500px;
    overflow-y: auto;
    overflow-x: auto;
  }
</style>
<style lang='scss' scoped>
  @import "@/assets/scss/light-bootstrap-dashboard.scss";
</style>
