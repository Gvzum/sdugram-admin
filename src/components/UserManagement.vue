  <template>
    <Header></Header>
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Manage <b>Users</b></h2>
            </div>
            <div class="col-sm-6">
              <button class="btn btn-primary" @click="addNewUserModal = true">
                <div>Add new user</div>
              </button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                
                <button @click="openEditModal(user)">
                  <img src="../assets/edit.svg" alt="" />
                </button>
                <button @click="deleteUser(user)">
                  <img src="../assets/delete.svg" alt="Delete Icon"/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add Modal HTML -->
    <div v-if="addNewUserModal" class="modal-mask" @click="addNewUserModal = false">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <h2>Fill out the form</h2>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="text" placeholder="email" v-model="email" />
          <input type="text" placeholder="role" v-model="role" />
          <input type="text" placeholder="password" v-model="password" />
          <input type="text" placeholder="first_name" v-model="first_name" />
          <input type="text" placeholder="last_name" v-model="last_name" />
          <input type="boolean" placeholder="is_active" v-model="is_active" />
          <br />
          <button @click="submitUserForm">send</button>
          <button @click="addNewUserModal = false">close</button>
        </div>
      </div>
    </div>
    <!-- Edit Modal HTML -->
    <div v-if="editUserModal" class="modal-mask" @click="closeEditModal">
    <div class="modal-wrapper" @click.stop>
      <div class="modal-container">
        <h2>Edit User</h2>
        <form @submit.prevent="submitEditUserForm">
          <input type="text" placeholder="Username" v-model="editUser.username" />
          <input type="text" placeholder="Password" v-model="editUser.password" />
          <input type="text" placeholder="First Name" v-model="editUser.first_name" />
          <input type="text" placeholder="Last Name" v-model="editUser.last_name" />
          <input type="text" placeholder="is_active" v-model="editUser.is_active" />
          <div>
            <button type="submit">Update</button>
            <button type="button" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

    <h6>
      <button @click.prevent="goToPreviousPage" :disabled="currentPage === 1">Back</button>
      <button @click.prevent="fetchNextPage" :disabled="currentPage === totalPages">Next</button>

  </h6>

  </template>

    
  <script>  

  import Header from "./Header.vue";
  import axios from "axios";  

  export default {
    name: "HomePage",
    components: {
      Header,
    },
    data() {
      return {
        users: [],
        username: "",
        email: "",
        password: "",
        role: "",
        is_active: "",
        first_name:"",
        last_name:"",
        addNewUserModal: false,
        currentPage: 1,
        editUserModal: false,
        user: null,
        totalPages: 0 
      };
    },
    methods: {
      goToPreviousPage() {
      this.currentPage--;
      this.fetchUsers();
    },
      async fetchUsers() {
        try {
          const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
          const response = await axios.get(
            `https://sdugram.kz/api/manage/users/user?page=${this.currentPage}`,

            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
              }
            }
          );
          console.log(this.currentPage);
          this.users = response.data.results.filter(user => user.is_active === true);
          this.totalPages = response.data.total_pages;
          console.log('Users length:', this.users.length);
      console.log('Current page:', this.currentPage);

          if (this.users.length === 0 && this.currentPage > 1) {
            this.currentPage--;
            await this.fetchUsers();
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },  


      async fetchNextPage() {
    try {
      const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
      const nextPage = this.currentPage + 1;
      const response = await axios.get(
        `https://sdugram.kz/api/manage/users/user?page=${nextPage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          }
        }
      );
      const filteredUsers = response.data.results.filter(user => user.is_active === true);
      if (filteredUsers.length > 0) {
        this.users = filteredUsers;
        this.currentPage = nextPage;
      }
      this.totalPages = response.data.total_pages;
    } catch (error) {
      console.error("Error fetching next page:", error);
    }
  },
      
  async submitUserForm() {
  try {
    const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
    const formData = new FormData();
    formData.append("username", this.username);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("role", this.role);
    formData.append("is_active", this.is_active);
    formData.append("first_name", this.first_name);
    formData.append("last_name", this.last_name);

    const response = await axios.post(
      "https://sdugram.kz/api/manage/users/user/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    if (response.status === 201) {
      alert("User created successfully");
    }
    this.addNewUserModal = false;
  } catch (error) {
    console.log(error.response.data);
    alert("Failed to create user. Please check your input and try again.");

  }
},

      openEditModal(user) {
      this.editUser = { ...user };
      this.editUserModal = true;
    },
    closeEditModal() {
      this.editUserModal = false;
      this.editUser = {};
    },
    async submitEditUserForm() {
  try {
    const formData = { 
      username: this.editUser.username,
      first_name: this.editUser.first_name,
      last_name: this.editUser.last_name,
      password: this.editUser.password,
      };
    await axios.patch(
      `https://sdugram.kz/api/manage/users/user/${this.editUser.id}/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-info')).access}`,
          "Content-Type": "application/json"
        }
      }
    );
    alert("User updated successfully");
    this.fetchUsers();
  } catch (error) {
    console.error("Error editing user:", error);
    alert("Failed to update user");
  }
},
  async deleteUser(user) {
        try {
          const accessToken = JSON.parse(localStorage.getItem('user-info')).access;
          const response = await axios.patch(
            `https://sdugram.kz/api/manage/users/user/${user.id}`,
            { is_active: false },
            {
              headers: {
                Authorization: `Bearer  ${accessToken}`,
                "Content-Type": "multipart/form-data",
              }
            }
          );
          if (response.status === 200) {
            alert('User deactivated successfully');
            this.fetchUsers();
          } else {
            console.error('Unexpected status code:', response.status);
          }
        } catch (error) {
          console.error("Error deactivating user:", error);
        }
      }
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>

    <style>
  /* Variables */
  :root {
    --primary-color: #435d7d;
    --secondary-color: #03a9f4;
    --text-color: #566787;
  }

  /* Layout */
  body {
    color: var(--text-color);
    background: #f5f5f5;
    font-family: "Varela Round", sans-serif;
    font-size: 13px;
  }

  .table-wrapper {
    background: #fff;
    padding: 20px 25px;
    margin: 30px 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  /* Add modal window */
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-container {
    width: 300px;
    margin: 100px auto; 
    padding: 40px;
    background-color: #fff;
    border-radius: 8px; 
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); 
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .modal-container h2 {
    margin-bottom: 20px;
    font-size: 24px; 
    color: var(--primary-color);
  }

  .modal-container input[type="text"],
  .modal-container input[type="boolean"] {
    width: calc(100% - 40px);
    margin-bottom: 15px;
    padding: 12px; 
    border: 1px solid #ccc;
    border-radius: 4px; 
    font-size: 16px;
  }

  .modal-container button {
    display: block;
    width: calc(100% - 20px); 
    padding: 12px;
    margin-top: 20px;
    background-color: var(--secondary-color); 
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s; 
  }

  .modal-container button:hover {
    background-color: #0397d6;
    transform: translateY(-2px);
  }

  /* Typography */
  .table-title h2 {
    margin: 5px 0 0;
    font-size: 24px;
  }

  /* Buttons */
  .table-title .btn {
    color: #fff;
    float: right;
    font-size: 13px;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
  }

  /* Links */
  .table td a {
    font-weight: bold;
    color: var(--text-color);
    display: inline-block;
    text-decoration: none;
    outline: none !important;
  }

  .table td a:hover {
    color: var(--primary-color);
  }

  /* Pagination */
  .pagination {
    float: right;
    margin: 0 0 5px;
  }

  .pagination li a {
    border: none;
    font-size: 13px;
    min-width: 30px;
    min-height: 30px;
    color: #999;
    margin: 0 2px;
    line-height: 30px;
    border-radius: 2px !important;
    text-align: center;
    padding: 0 6px;
  }

  .pagination li a:hover {
    color: #666;
  }

  .pagination li.active a,
  .pagination li.active a.page-link {
    background: var(--secondary-color);
  }

  .pagination li.active a:hover {
    background: #0397d6;
  }
  </style>