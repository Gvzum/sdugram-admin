<template>
  <header class="py-4" style="background-color: rgb(28, 21, 166)">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
      

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="isSuperuser">
              <a class="nav-link" href="/home">Mentors</a>
            </li>
            <li class="nav-item" v-if="isSuperuser">
              <a class="nav-link" href="/approved-mentors">Approved Mentors</a>
            </li>
            <li class="nav-item" v-if="isSuperuser">
              <a class="nav-link" href="/declined-mentors">Declined Mentors</a>
            </li>
            <li class="nav-item" v-if="isSuperuser">
              <a class="nav-link" href="/management">User Management</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/list-posts">Post</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Log out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderLine',
  data() {
    return {
      mentors: [],
    };
  },
  computed: {
    isSuperuser() {
      // Check if the client is a superuser based on the flag in localStorage
      const userInfo = JSON.parse(localStorage.getItem('user-info'));
      return userInfo && userInfo.isSuperUser;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({name: 'LoginForm'})
    }
  }
}
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
}

.nav-item {
  margin: 0 10px;
}

.nav-link {
  display: block;
  padding: 8px 16px;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover, .nav-link:focus {
  background-color: #163177;
  color: #ffffff;
  border-radius: 4px;
}

.nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
}
</style>