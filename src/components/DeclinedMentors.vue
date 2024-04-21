<template>
    <Header></Header>
    <div>
      <h3>Declined mentors</h3>
      <div class="container mt-3">
        <div class="row">
          <div v-for="mentor in results" :key="mentor.id" class="card" style="width:30%">
            <div class="card-body">
              <h4 class="card-title">{{ mentor.user.username }}</h4>
              <p class="card-text">{{ mentor.cover_letter }}</p>
            </div>
            <button v-on:click="seeMore((mentor.id))" class="btn btn-info" style="background-color: rgb(80, 54, 248)">see more</button>
            <div v-if="mentor.request_status === 'DECLINED'">declined</div>
          </div>
        </div>  
      </div>
    </div>  
  </template>
  
  <script>  
  import Header from './Header.vue'
  import axios from 'axios';
  
  export default {
    name: 'ApprovedMentors',
    components: {
      Header
      },
    data() {
      return {
        results: []
      };
    },
    methods: {
      async declinedMentors() {
        try {
          const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
          const response = await axios.get('http://93.183.84.234:8000/api/integration/mentor/mentor-request/',
          {headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
  );
            this.results = response.data.results.filter(mentor => mentor.request_status === 'DECLINED');
        } catch (error) {
          console.error('Error fetching mentors:', error);
        }
      },
      seeMore(mentorId){
        this.$router.push({ name: 'MentorsDetail', params: { mentorId: mentorId } });
      },

    },
    created() {
      this.declinedMentors();
    }
  };
  </script>