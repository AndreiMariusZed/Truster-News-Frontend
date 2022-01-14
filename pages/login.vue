<template>
  <div class="container">
    <client-only>
      <div class="child">
        <p>Login Page</p>
        <cs-input label="Email" type="email" v-model="email"></cs-input>
        <cs-input
          label="Password"
          type="password"
          v-model="password"
        ></cs-input>
        <cs-button @click="onLogin">Login</cs-button>
        <cs-button @click="$router.push('/signup')">Sign Up</cs-button>
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
      email: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      try {
        this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
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
