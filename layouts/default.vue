<template>
  <div>
    <client-only>
      <Navbar
        class="navbar"
        :logo="logo"
        :links="links"
        :darkBackground="false"
        onHover="slide"
        logoTextClass="logo-text"
      />
      <div v-if="!$auth.$state.loggedIn">
        <cs-button @click="$router.push('/signup')">Sign Up</cs-button>
        <cs-button @click="$router.push('/login')">Login</cs-button>
      </div>
      <div v-else>
        <p>
          Logged in as {{ $auth.$state.user.firstName }}
          {{ $auth.user.lastName }}
        </p>
        <cs-button @click="onLogout">Log out</cs-button>
      </div>
    </client-only>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "vue-navbar-component";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      logo: {
        img: "https://picsum.photos/203",
        text: "TRUSTER",
      },
      links: [
        {
          name: "Articles",
          click: () => this.$router.push("/"),
        },
        {
          name: "Profile",
          click: () => this.$router.push("/profile"),
        },
      ],
    };
  },
  methods: {
    async onLogout() {
      await this.$auth.logout();
    },
  },
};
</script>
<style></style>
