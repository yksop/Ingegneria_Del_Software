<template>
  <div class="container" v-if="tokenIsValid">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="new-password">New Password</h2>
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="New password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p v-if="tokenExpired" class="text-danger">{{ errorMessage }}</p>
  </div>
</template>
      
  <script>
import axios from "../axiosConfig";

export default {
  data() {
    return {
      token: "",
      tokenIsValid: false,
      password: "",
      errorMessage: "Password reset token is invalid or has expired.",
      tokenExpired: false,
    };
  },
  async created() {
    this.token = this.$route.params.token;

    const url = axios.defaults.baseURL + `/api/v1/passwords/${this.token}`;

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Token validation failed");
        }

        this.tokenIsValid = true;
      })
      .catch((error) => {
        console.log("Request error:", error);
        this.errorMessage = error.response.data;
        this.tokenExpired = true;
      });
  },
  methods: {
    resetPassword() {
      const url = axios.defaults.baseURL + `/api/v1/passwords/${this.token}`;

      axios
        .post(url, { password: this.password })
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.message);
            window.location.href = response.data.redirectTo;
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
.new-password {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 20px;
}

.card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  background: #f8f9fa;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  background: linear-gradient(to right, #007bff, #0056b3);
  border-color: #007bff;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: linear-gradient(to right, #0056b3, #007bff);
  border-color: #0056b3;
  transform: scale(1.05);
}

.text-danger {
  color: #dc3545;
  text-align: center;
  margin-top: 15px;
  font-family: "Roboto", sans-serif;
  transition: all 0.3s ease;
}
</style>