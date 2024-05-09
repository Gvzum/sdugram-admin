<template>
  <Header></Header>
  <div class="m-4">
    <div class="row m-3">
      <div class="col d-flex">
        <h3 class="m-0">List of Posts</h3>
      </div>
      <div class="col d-flex justify-content-end">
        <router-link to="/create-post" class="btn btn-primary">Add</router-link>
      </div>
    </div>

    <div class="table-container">
      <table class="post-table">
        <thead>
        <tr>
          <th>Title</th>
          <th>Subtitle</th>
          <th>Body</th>
          <th>Published Date</th>
          <th>Scanner Ticket</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ truncateText(post.subtitle, 50) }}</td>
          <td>{{ truncateText(post.body, 50) }}</td>
          <td>{{ post.published_date }}</td>
          <td>
            <router-link v-if="post.event" :to="{ name: 'QRScanner', params: { event_id: post.event.id } }"
                         class="btn btn-secondary">Scan
            </router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="deletePost(post.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";

const baseUrl = "https://sdugram.kz/";

export default {
  name: 'ListPosts',
  components: {Header},
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    truncateText(text, length) {
      if (text != null && text.length > length) {
        return text.substring(0, length) + '...';
      } else {
        return text;
      }
    },
    async listOfPosts() {
      const userInfo = JSON.parse(localStorage.getItem('user-info'));
      const authorQueryParam = userInfo.isSuperUser ? '' : `?author=${userInfo.userId}`
      const listOfArticlesUrl = `${baseUrl}api/integration/blog/articles${authorQueryParam}`
      try {
        const response = await axios.get(
            listOfArticlesUrl,
            {
              headers: {
                'Authorization': `Bearer ${userInfo.access}`,
                'Content-Type': 'application/json',
              },
            }
        );
        this.posts = response.data.results;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = "/"
        }
        console.error('Error fetching mentors:', error);
      }
    },
    async deletePost(postID) {
      const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
      const deleteArticleUrl = `${baseUrl}api/integration/blog/articles/${postID}/delete`
      try {
        await axios.delete(
            deleteArticleUrl,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
        );
        this.posts = this.posts.filter(post => post.id !== postID)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = "/"
        }
        console.error('Error fetching mentors:', error);
      }
    }
  },
  mounted() {
    this.listOfPosts()
  },
  computed: {},
};
</script>

<style scoped>
.btn-create {
  float: right;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.table-container {
  overflow-x: auto;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th, .post-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.post-table th {
  background-color: #f2f2f2;
  text-align: center;
}

@media screen and (max-width: 600px) {
  .article-table th, .article-table td {
    padding: 5px;
  }
}
</style>