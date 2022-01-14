<template>
  <div class="container">
    <client-only>
      <div class="child">
        <p>Sign Up Page</p>
        <cs-input label="First Name" type="text" v-model="firstName"></cs-input>
        <cs-input label="Last Name" type="text" v-model="lastName"></cs-input>
        <cs-input label="Username" type="text" v-model="username"></cs-input>
        <cs-input label="Email" type="email" v-model="email"></cs-input>
        <cs-input
          label="Password"
          type="password"
          v-model="password"
        ></cs-input>
        <cs-button @click="onSignUp">Sign Up</cs-button>
        <cs-button @click="$router.push('/login')">Login</cs-button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async onSignUp() {
      try {
        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        };
        let response = await this.$axios.$post("/api/auth/signup", data);
        console.log(response);
        if (response.success) {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
* >>> .cs-input__input {
  width: 300px !important;
}
.container {
  margin-top: 80px;
  width: 100%;
  height: 100%;
  position: relative;
}
.child {
  width: 500px;
  height: 500px;
  /* Center vertically and horizontally */
  position: absolute;
  top: 50%;
  left: 43%;
}
</style>
