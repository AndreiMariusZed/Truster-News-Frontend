<template>
  <div class="reset-password">
    <div class="form-wrap">
      <div class="login">
        <p class="login-register">
          Back to
          <nuxt-link to="/login">Login</nuxt-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset it!</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <i class="cs-icons-email icon"></i>
          </div>
        </div>
        <client-only>
          <cs-button @click="resetPassword">Reset</cs-button>
        </client-only>
        <div class="angle"></div>
      </div>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  middleware: "auth",
  auth: "guest",
  layout: "none",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      await this.$strapi.forgotPassword({ email: "andreimariuszed@gmail.com" });
      console.log("asdsa");
    },
  },
};
</script>

<style scoped>
a {
  color: #0a64bc !important;
}
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
}
@media (min-width: 900px) {
  .form-wrap {
    width: 100%;
  }
}
.form-wrap .login-register .router-link {
  color: black;
}
.form-wrap .login {
  padding: 0 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  flex: 1;
}
@media (min-width: 900px) {
  .form-wrap .login {
    padding: 0 50px;
  }
}
.form-wrap .login h2 {
  text-align: center;
  font-size: 32px;
  color: #303030;
  margin-bottom: 20px;
}
@media (min-width: 900px) {
  .form-wrap .login h2 {
    font-size: 40px;
  }
}
.form-wrap .login .inputs {
  width: 100%;
  max-width: 350px;
}
.form-wrap .login .inputs .input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.form-wrap .login .inputs .input input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 4px 4px 4px 30px;
  height: 50px;
}
.form-wrap .login .inputs .input input:focus {
  outline: none;
}
.form-wrap .login .inputs .input .icon {
  width: 12px;
  position: absolute;
  left: 6px;
}
.form-wrap .login .forgot-password {
  text-decoration: none;
  color: black;
  cursor: pointer;
  font-size: 14px;
  margin: 16px 0 32px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease all;
}
.form-wrap .login .forgot-password:hover {
  border-color: #303030;
}
.form-wrap .login .angle {
  display: none;
  position: absolute;
  background-color: #fff;
  transform: rotateZ(3deg);
  width: 150px;
  right: -60px;
  height: 101%;
}
@media (min-width: 900px) {
  .form-wrap .login .angle {
    display: initial;
  }
}
.form-wrap .background {
  display: none;
  flex: 2;
  background-size: cover;
  background-image: url("../assets/background2.jpg");
  width: 100%;
  height: 100%;
}
@media (min-width: 900px) {
  .form-wrap .background {
    display: initial;
  }
}
</style>
