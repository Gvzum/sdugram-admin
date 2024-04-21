<template>
  <Header></Header>
  <div>
    <h3>Application for mentoring</h3>
    <div class="container mt-3">
      <div class="row">
        <div v-for="mentor in results" :key="mentor.id" class="card" style="width:30%">
          <div class="card-body">
            <h4 class="card-title">{{ mentor.user.username }}</h4>
            <p class="card-text">{{ mentor.cover_letter }}</p>
            <a href="#" class="btn btn-success" v-on:click="accept(mentor.id)">accept</a>
            <a href="#" class="btn btn-danger" v-on:click="decline(mentor.id)">decline</a>
          </div>
          <button v-on:click="seeMore(mentor.id)" class="btn btn-info" style="background-color: rgb(80, 54, 248)">see more</button>
          <div v-if="mentor.request_status === 'IN_PROGRESS'">in progress</div>
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
      results: []
    };
  },
  methods: {
    async fetchMentors() {
      try {
        const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
        const response = await axios.get('http://93.183.84.234:8000/api/integration/mentor/mentor-request/',
        {headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
);
      this.results = response.data.results.filter(mentor => mentor.request_status === 'IN_PROGRESS');
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    },
    seeMore(mentorId) {
      alert(mentorId)
      this.$router.push({ name: 'MentorsDetail', params: { mentorId: mentorId } });
  },
    async accept(mentorId) {
  try {
    const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
     await axios.patch(`http://93.183.84.234:8000/api/integration/mentor/handle-mentor-request/${mentorId}`, 
      {
        request_status: 'APPROVED' 
      },
      { 
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );  
    this.fetchMentors();
  } catch (error) {
    console.error('Ошибка при принятии запроса:', error.response.data);
  }},
  async decline(mentorId) {
  try {
    const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
       await axios.patch(`http://93.183.84.234:8000/api/integration/mentor/handle-mentor-request/${mentorId}`, 
      {
        request_status: 'DECLINED' 
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );  
    this.fetchMentors();
  } catch (error) {
    console.error('Ошибка при принятии запроса:', error.response.data);
  }},

  },    
  created() {
    this.fetchMentors();
  }
};
</script>
<style>
</style>