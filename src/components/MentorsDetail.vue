<template>
  <Header></Header>
  <div class="mentor-request-details">
    <h3 class="heading">Mentor Request Details</h3>
    <div v-if="mentorRequest" class="details">
      <div class="detail-item">
        <label class="detail-label">Cover Letter:</label>
        <p>{{ mentorRequest.cover_letter }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">Status:</label>
        <p>{{ mentorRequest.request_status }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">User:</label>
        <p>{{ mentorRequest.user.username }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">Email:</label>
        <p>{{ mentorRequest.user.email }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">University:</label>
        <p>{{ mentorRequest.university }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">Occupation:</label>
        <p>{{ mentorRequest.occupation }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">Company:</label>
        <p>{{ mentorRequest.company }}</p>
      </div>
      <div class="detail-item">
        <label class="detail-label">Years of Experience:</label>
        <p>{{ mentorRequest.year_experience }}</p>
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "MentorRequestDetails",
  data() {
    return {
      mentorRequest: null
    };
  },
  async mounted() {
    console.log("this is:",this.$route.params);

    const mentorId = this.$route.params.mentorId;
    const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
    try {
      const response = await axios.get(`https://sdugram.kz/api/integration/mentor/mentor-request/${mentorId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      this.mentorRequest = response.data;
    } catch (error) {
      console.error("Error fetching mentor request:", error);
    }
  }
};
</script>
<style scoped>
.mentor-request-details {
  font-family: 'Arial', sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.heading {
  color: #007bff;
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #007bff;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-item {
  background-color: #f7f7f7;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.detail-label {
  font-weight: bold;
  color: #444; 
  margin-bottom: 5px;
}

p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #999;
}
</style>
