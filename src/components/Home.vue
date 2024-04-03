<template>
  <Header></Header>
  <div>
    <h3>Заявки на менторство</h3>
    <div class="container mt-3">
      <div class="row">
      <div v-for="mentor in mentors" :key="mentor.id" class="card" style="width:30%">
        <div class="card-body">
          <h4 class="card-title">{{ mentor.name }} {{ mentor.surname }}</h4>
          <p class="card-text">{{ mentor.letter }}</p>
          <a href="#" class="btn btn-success">Accept</a>
          <a v-on:click="decline" class="btn btn-danger">Decline</a>
        </div>
        <a href="#" >See more</a>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    Header
  },
  data() {
    return {
      mentors: []
    };
  },
  methods: {
    async fetchMentors() {
      try {
        const response = await axios.get('http://localhost:3000/mentors');
        this.mentors = response.data;
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    },
    decline(){
      const res =  confirm({
        title : 'do u wann&',
        content: 'To click OK or not to click OK, that is a question.',
          yes: 'OK',
          yesValue: 'good',
          no: 'Cancel',
          noValue: 'not good'
      })
      console.log(res);
    },
  },
  created() {
    this.fetchMentors();
  }
};
</script>
<style>

.card-img-top{
      width: 120px !important;
      height: 120px !important;
      border-radius: 100% !important;
      overflow: hidden !important;
      border: 2px solid black !important;

}
</style>