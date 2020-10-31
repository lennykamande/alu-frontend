<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your email address: {{ name }}</p>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        email: ''
      }
    },
    computed:{
      name (){
      return this.$store.getters.user
      }
    },
    created () {
      this.getJokes();
    },
    methods: {
      
      getJokes (){
        axios.get('https://official-joke-api.appspot.com/jokes/ten')
        .then(res => console.log(res))
        .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>