<template>
  <body class="fixed-centered">
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
  </body>
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
body.fixed-centered {
  background-image: url('../assets/sduu.png'), linear-gradient(to right, #f4f4f8, #e6e6ea);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f8;
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.login {
  background-color: white;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.login input {
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login input:focus {
  border-color: #0056b3;
  box-shadow: 0 0 8px rgba(0,86,179,0.2);
}

.login button {
  width: 100%;
  padding: 10px 0;
  background-color: #0066cc;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.login button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

</style>
