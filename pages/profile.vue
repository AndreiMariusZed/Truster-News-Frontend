<template>
  <div class="container">
    <client-only>
      <div class="child">
        <p>Profile Page</p>
        <cs-input label="First Name" type="text" v-model="firstName"></cs-input>
        <cs-input label="Last Name" type="text" v-model="lastName"></cs-input>
        <cs-input label="Username" type="text" v-model="username"></cs-input>
        <cs-textarea v-model="description" label="Description"> </cs-textarea>
        <cs-input
          label="Password"
          type="password"
          v-model="password"
        ></cs-input>
        <cs-button @click="onSaveChanges">Save changes</cs-button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: this.$auth.$state.user.firstName,
      lastName: this.$auth.$state.user.lastName,
      username: this.$auth.$state.user.username,
      description: this.$auth.$state.user.description,
      password: "*************",
    };
  },
  methods: {
    async onSaveChanges() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        description: this.description,
      };
      try {
        let response = await this.$axios.$put("/api/auth/user", data);
        if (response.success) {
          console.log("a mers");

          await this.$auth.fetchUser();
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
