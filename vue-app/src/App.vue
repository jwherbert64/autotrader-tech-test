<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
<!--     <div v-if="hasError">
      <p>An error has occurred...</p>
    </div>
    <div v-else-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      {{ info }}
    </div> -->
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'App'//,
  // data: function () {
  //   return {
  //     info: null,
  //     isLoading: true,
  //     hasError: false
  //   }
  // },
  // mounted () {
  //   axios
  //     .get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //     .then(response => {
  //       this.info = response.data.bpi
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       this.hasError = true
  //     })
  //     .finally(() => {
  //       this.isLoading = false
  //     })
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
