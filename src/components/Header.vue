<template>
  <header class="py-4" style="background-color: rgb(28, 21, 166)">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="/">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/home">Mentors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/approved-mentors">Approved Mentors</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/declined-mentors">Declined Mentors</a>
            </li>
            <li class="nav-item">
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
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({name: 'LoginForm'})
    }
  }
}
</script>
<style>
.navbar-dark .navbar-nav .nav-link {
  color: white;
}
</style>