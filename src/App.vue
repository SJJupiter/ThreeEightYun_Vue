<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import BufferAnimation from 'vue-scroll-buffer';
export default {
  name: "App",

  mounted() {
    BufferAnimation(10)
  },
  updated() {
    window.scroll(0, 0);
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #b6cac0; */
  background-color: white;
  width: 100%;
  height: 100%;
  /* position: fixed; */
  margin:0px;
  padding:0px;
  
}


*{
  margin: 0;
  padding: 0;
}

</style>
