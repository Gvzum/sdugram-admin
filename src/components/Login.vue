<template>
  <img class="logo" src="../assets/sdu.png" />
  <h1>Welcome to admin page</h1>
  <div class="login">
    <input
      type="text"
      v-model="email"
      placeholder="Enter email or phone number"
    />
    <input type="password" v-model="password" placeholder="Enter password" />
    <button v-on:click="login">Login</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
   //**         try{*/
                let result = await axios.get(`http://localhost:3000/user?email=${this.email}&password=${this.password}`
                    );
                if(result.status==200 && result.data.length>0){
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                    this.$router.push({name:'Home'});
                }
                else
                alert("Incorrect email or password");
        },
    },
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