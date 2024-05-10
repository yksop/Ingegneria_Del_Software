<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2>Login</h2>
      <div class="input-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="credentials.username"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: "Mario",
        password: "Mario1234#",
      },
    };
  },
  methods: {
    login() {
      console.log("Login attempted with:", this.credentials);
      // Here you would typically handle the login logic, perhaps sending the data to a server
    },
  },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  padding: 2rem;
  background: white;
  margin: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 350px;
  /*box-sizing: border-box;*/
}

h2 {
  text-align: center;
  color: #333;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #5c67f2;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #5058e5;
}

button:active {
  background-color: #4045b2; /* Darker shade when the button is clicked */
}
</style>