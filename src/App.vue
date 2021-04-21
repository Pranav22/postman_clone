<template>
  <div id="app">
    <clone/>
  </div>
</template>

<script>
import clone from './components/clone.vue'
export default {
  name: 'App',
  components: {
    clone
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
  margin-top: 60px;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
