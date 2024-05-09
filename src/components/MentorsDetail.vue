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
  background-image: url('../assets/lib.jpg');
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 20px;
  width: 100%;
  margin: auto; 
}

.heading {
  color: #333;
  font-size: 32px;
  margin-bottom: 30px;
  text-align: center;
  width: 100%; 
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.details {
  flex-direction: column;
  width: 45%; 
  justify-content: center;

}

.detail-item {
  background-color: rgba(247, 247, 247, 0.9);
  padding: 20px;
  margin-bottom: 15px; 
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  width: 80%;
}


.detail-label {
  font-weight: bold;
  color: #444;
  margin-bottom: 5px;
}

p {
  margin: 0;
  color: #666;
  font-size: 18px;
}

.loading {
  text-align: center;
  font-size: 20px;
  color: #999;
  width: 100%;
}
</style>


