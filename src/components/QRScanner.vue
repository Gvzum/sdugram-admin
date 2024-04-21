<template>
  <Header></Header>
  <div class="m-4">
    <h2>QR Code Scanner</h2>
    <div>
      <p>{{ error }}</p>
      <div class="d-flex">
        <div v-if="!paused" class="w-3/4 h-50 m-auto">
          <qrcode-stream @error="onError" @detect="onDetect" :paused="paused"></qrcode-stream>
        </div>
        <div v-else class="w-3/4 h-50 m-auto">
          <div v-if="isValidQR">
            <div style="background-color: #d4edda; padding: 10px; border-radius: 5px;">
              <i class="fas fa-check-circle" style="color: #155724;"></i>
              <h1 style="display: inline; margin-left: 10px; color: #155724;">Valid QR Code</h1>
            </div>
            <!-- Your template for valid QR code -->
          </div>
          <div v-else>
            <div style="background-color: #f8d7da; padding: 10px; border-radius: 5px;">
              <i class="fas fa-exclamation-circle" style="color: #721c24;"></i>
              <h1 style="display: inline; margin-left: 10px; color: #721c24;">Invalid QR Code</h1>
            </div>
            <p>Sorry, the QR code you entered is invalid.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {QrcodeStream} from "vue-qrcode-reader";
import Header from "@/components/Header.vue";
import axios from "axios";

export default {
  name: 'QRScanner',
  data() {
    return {
      paused: false,
      isValidQR: null,
      error: "",
      decodedString: "",
    }
  },
  components: {
    Header,
    QrcodeStream
  },
  methods: {
    onError(error) {
      if (error.name === 'NotAllowedError') {
        // user denied camera access permission
        this.error = "Denied access for camera"
      } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
        this.error = "No suitable camera device"
      } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
        this.error = "Page is not served over HTTPS"
      } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
        this.error = "Maybe camera is already in use"
      } else if (error.name === 'OverconstrainedError') {
        // did you request the front camera although there is none?
        this.error = "Did you request the front camera"
      } else if (error.name === 'StreamApiNotSupportedError') {
        // browser seems to be lacking features
        this.error = "Browser is not supported"
      }
    },
    async onDetect(detectedCodes) {
      const ticketID = detectedCodes[0].rawValue
      const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
      try {
        const response = await axios.post('https://sdugram.kz/api/integration/blog/check-ticket-qr/',
            {
              ticket_id: ticketID,
              event_id: this.$route.params.event_id
            },
            {
              headers: {
                'Authorization':
                    `Bearer ${accessToken}`,
                'Content-Type':
                    'application/json',
              },
            }
        );
        console.log(response, "Success response")
        this.paused = true;
        this.isValidQR = true;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          window.location.href = "/"
        }
        this.paused = true;
        this.isValidQR = false;
        console.error('Error fetching mentors:', error);
      }
    },
  }
}
</script>