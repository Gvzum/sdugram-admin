<template>
  <Header></Header>
  <div class="application-for-mentoring">
    <h3>Approved Mentors</h3>
    <div class="container mt-3">
      <table class="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Cover Letter</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mentor in results" :key="mentor.id">
            <td>{{ mentor.user.username }}</td>
            <td>{{ mentor.cover_letter }}</td>
            <td>
              <button v-on:click="seeMore(mentor.id)" class="btn btn-info">see more</button>
            </td>
            <td v-if="mentor.request_status === 'APPROVED'">approved</td>
          </tr>
        </tbody>
      </table>
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
      async approvedMentors() {
        try {
          const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
          const response = await axios.get('https://sdugram.kz/api/integration/mentor/mentor-request/',
          {headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
  );
            this.results = response.data.results.filter(mentor => mentor.request_status === 'APPROVED');
        } catch (error) {
          console.error('Error fetching mentors:', error);
        }
      },
      seeMore(mentorId){
        this.$router.push({ name: 'MentorsDetail', params: { mentorId: mentorId } });
      },
    },
    created() {
      this.approvedMentors();
    }
  };
  </script>
  
  <style scoped>
  .application-for-mentoring {
    font-family: 'Arial', sans-serif;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .container {
    margin-top: 20px;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .table thead {
    background-color: #007bff;
    color: #fff;
  }
  
  .table th, .table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .table th {
    background-color: #007bff;
    color: #fff;
  }
  
  .table tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  .btn {
    border: none;
    color: #fff;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .btn-success {
    background-color: #28a745;
  }
  
  .btn-danger {
    background-color: #dc3545;
  }
  
  .btn-info {
    background-color: #17a2b8;
  }
  
  .btn:hover {
    opacity: 0.9;
  }
  </style>
  