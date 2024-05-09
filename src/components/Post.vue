<template>
  <Header></Header>
  <div class="post">
  <div class="container">
    <h2>Create New Blog Article</h2>
    <div class="form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" placeholder="Enter title"/>
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea id="body" v-model="body" placeholder="Enter body"></textarea>
      </div>
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input type="datetime-local" id="startTime" v-model="startTime"/>
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" v-model="quantity" placeholder="Enter quantity"/>
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location" placeholder="Enter location"/>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="price" placeholder="Enter price"/>
      </div>
      <div class="form-group">
        <label for="price">Categories</label>
        <input type="text" id="categories" v-model="categories" placeholder="Enter categories"/>
      </div>
      <button @click="createArticle">Create Article</button>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';

export default {
  name: 'CreatePost',
  components: {
    Header
  },
  data() {
    return {
      title: '',
      body: '',
      startTime: '',
      background_image: null,
      quantity: '',
      location: '',
      price: '',
      categories: '',
    };
  },
  methods: {
    async createArticle() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('body', this.body);
      formData.append('start_time', this.startTime);
      formData.append('quantity', this.quantity);
      formData.append('location', this.location);
      formData.append('price', this.price);
      formData.append('categories', this.categories);

      const userInfo = JSON.parse(localStorage.getItem('user-info'));
      const baseUrl = "https://sdugram.kz/"
      const response = await axios.post(
          baseUrl + 'api/integration/blog/articles/create/',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${userInfo.access}`,
              'Content-Type': 'multipart/form-data',
            },
          }
      );
      if (response.status === 201) {
        alert("Article created successfully");
      }
    }
  },
};
</script>

<style scoped>
.post {
  background-image: url('../assets/dom.jpg');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
textarea,
input[type="datetime-local"],
input[type="file"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus,
input[type="datetime-local"]:focus,
textarea {
  height: 120px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
