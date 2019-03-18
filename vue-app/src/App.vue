<template>
  <div id="app">
    <div class="app__header">
      <img src="./assets/logo.svg">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './styles/styles.css';
</style>
