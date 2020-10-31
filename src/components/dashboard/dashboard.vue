<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <div class="row">
      <p> Welcome {{name}}
      </p>
      <div class="col-lg-6" >
        
        <div class="card" v-for="(joke, index) in jokes" :joke="joke" :key="joke.id">
          <div class="container">
            <h4><b>Joke: {{joke.setup}}</b></h4> 
            <p>punchline: {{joke.punchline}}</p> 
          </div>
        </div>

        <div class="clearfix">
        </div>

        </div>

        
      </div>
      <h1>Anime Objects</h1>

      <div class="row">
      <div class="col-lg-6" >
        
        <div class="card" v-for="(anime, index) in animes" :anime="anime" :key="anime.id">
          <div class="container">
            <h4><b>Anime ID: {{anime.id}}</b></h4> 
            <img :src="anime.attributes.posterImage.tiny" height="50%" width="50%"/> 
          </div>  
        </div>

        <div class="clearfix">
        </div>  

        </div>

        
      </div>
    </div>
    
  </div>
</template>

<script>
  import LocalAxios from '../../axios-anime'
  import axios from 'axios';

  export default {
    data () {
      return {
        email: '',
        jokes: [],
        animes: []

      }
    },
    computed:{
      name (){
      return this.$store.getters.user
      }
    },
    created () {
      this.getJokes();
      this.getAnimes();
    },
    methods: {
      
      getJokes (){
        axios.get('https://official-joke-api.appspot.com/jokes/ten')
        .then(res => {
          const data = res.data;
          for (let key in data) {
            const joke = data[key];
            this.jokes.push(joke);
            }
        })
        .catch(error => console.log(error))
        console.log("Jokes");
        console.log(this.jokes);
      },
      getAnimes (){
        LocalAxios.get('?filter[categories]=adventure')
        .then(res => {
          console.log(res.data.data)
          const data = res.data.data;
          for (let key in data) {
            const anime = data[key];
            this.animes.push(anime);
          
        }
        })
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
    color: #333333;
  }

  .row{
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
    margin-right: 15px;
    background-color: #fafbfe;
    color: #6c757d;
  }
  .col-lg-12, .col-lg-6{
    position: relative;
    display: flex;
    width: 100%;
    padding-right: 12px;
    padding-left: 12px;
    flex-wrap:wrap;
    overflow-y:hidden;
  }

  .card{
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 300px;
  height: 200px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  }

  .container {
  padding: 2px 16px;
  }

  .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  .clearfix::after{
    display:block;
    clear:both;
    content:""}

</style>