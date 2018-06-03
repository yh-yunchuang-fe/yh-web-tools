<style lang="less">

    h1 {
        font-size: 40px;
        .highLight {
            color: #00aeff;
        }
    }
    .img {
        width: 500px;
        height: 260px;
    }
    .rem-demo {
        width: 200px;
        height: 200px;
        border: 1px solid #ddd; /*no*/
        background-color: skyblue;
    }

</style>

<template>
  <div class="app">
      <h1>Hello
          <span class="highLight"> {{name}}</span>
      </h1>
      <img src="./assets/imgs/alone.jpg" alt="" class="img"/>
      <div class="rem-demo">
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'World'
      }
    }
  }
</script>

