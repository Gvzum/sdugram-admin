<template>
  <img class="logo" src="../assets/sdu.png"/>
  <h1>Welcome to admin page</h1>
  <div class="login">
    <input
        type="text"
        v-model="username"
        placeholder="Enter email or phone number"
    />
    <input type="password" v-model="password" placeholder="Enter password"/>
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      const userInfo = new Map()
      const baseUrl = "https://sdugram.kz/"

      try {
        const authUrl = `${baseUrl}api/integration/auth/token/`
        const requestData = {
          username: this.username,
          password: this.password
        }
        const response = await axios.post(authUrl, requestData);

        if (response.status === 200) {
          console.log("Successfully authorized")
          userInfo.set("access", response.data.access);
        } else {
          alert("Incorrect email or password");
          return;
        }

      } catch {
        alert("Incorrect email or password")
        return;
      }

      try {
        const getInfoUrl = `${baseUrl}api/integration/user/get-user-data/`
        const headers = {
          "Authorization": "Bearer " + userInfo.get("access")
        }
        const response = await axios.get(getInfoUrl, {headers: headers});
        const data = response.data
        userInfo.set("role", data.profile_type);
        userInfo.set("userId", data.id);
        userInfo.set("isSuperUser", data.is_superuser);

        if (response.status === 200) {
          console.log("Successfully got user info")
        } else {
          alert("Incorrect email or password");
          return;
        }

      } catch {
        alert("Incorrect email or password")
        return;
      }

      localStorage.setItem("user-info", JSON.stringify(Object.fromEntries(userInfo)));

      if (userInfo.get("isSuperUser") === true) {
        await this.$router.push({name: 'Home'});
      } else {
        await this.$router.push({name: 'ListPosts'});  // Permitted only posts
      }
    }
  }
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 5px;
}

.logo {
  width: 100px;
}

.login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid rgb(14, 5, 142);
}

.login button {
  width: 320px;
  height: 40px;
  border: 1px solid rgb(38, 73, 225);
  background: rgb(28, 21, 166);
  color: #fff;
  cursor: pointer;
}
</style>
