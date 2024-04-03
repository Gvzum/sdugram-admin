<template>
  <div class="container">
    <h2>Create New Blog Article</h2>
    <div class="form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" placeholder="Enter title" />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea id="body" v-model="body" placeholder="Enter body"></textarea>
      </div>
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input type="datetime-local" id="startTime" v-model="startTime" />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" ref="file" @change="handleFileChange" />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" id="quantity" v-model="quantity" placeholder="Enter quantity" />
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input type="text" id="location" v-model="location" placeholder="Enter location" />
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" id="price" v-model="price" placeholder="Enter price" />
      </div>
      <button @click="createArticle">Create Article</button>
      <b-modal ref="myModal" title="Success">
      <p>Your article has been successfully created.</p>
    </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      body: '',
      startTime: '',
      background_image: null,
      quantity: '',
      location: '',
      price: '',
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

  const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
    const response = await axios.post(
      'http://127.0.0.1:8000/api/integration/blog/articles/create/',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log(response);
    if (response.status === 201) {
      alert("Article created successfully");
    }
}
  },};
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea,
input[type="datetime-local"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

textarea {
  height: 150px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
