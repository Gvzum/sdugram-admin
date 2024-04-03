<template>
    <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/home" class="nav-link px-2 link-secondary">Mentors</a></li>
          <li><a href="/categories" class="nav-link px-2 link-dark">Categories</a></li>
          <li><a href="/management" class="nav-link px-2 link-dark">User management</a></li>
          <li><a href="/post" class="nav-link px-2 link-dark">Post</a></li>
          <li><a v-on:click="logout" class="nav-link px-2 link-dark" href="#">Log out</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default{
    name: 'HeaderLine',
    data(){
        return {
          mentors: [],
    };
    },
    methods: {
    logout()
    {
      localStorage.clear();
      this.$router.push({name:'LoginForm'})
    }
}

}
</script>