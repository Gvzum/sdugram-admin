<template>
  <div class="mentor-request-details">
    <h2 class="heading">Mentor Request Details</h2>
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
      const response = await axios.get(`http://93.183.84.234:8000/api/integration/mentor/mentor-request/${mentorId}`, {
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
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .heading {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .details {
    margin-bottom: 20px;
  }

  .detail-item {
    margin-bottom: 10px;
  }

  .detail-label {
    font-weight: bold;
  }

  .loading {
    text-align: center;
  }
</style>
