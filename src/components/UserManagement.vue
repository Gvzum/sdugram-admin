<template>
    <Header></Header>
    <div class="container-xl">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.username">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
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
    name: 'HomePage',
    components: {
      Header
    },
    data() {
      return {
        users: [],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
          const response = await axios.get('http://93.183.84.234:8000/api/manage/users/user/',
          {headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
          );
          this.users = response.data.results;
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      decline() {
      },
    },
    created() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style>
  </style>
  