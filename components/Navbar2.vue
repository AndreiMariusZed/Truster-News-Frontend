<template>
  <div>
    <client-only>
      <div class="navbar">
        <Navbar
          class="navbar"
          :logo="logo"
          :links="links"
          :darkBackground="false"
          onHover="fade-underline"
          logoTextClass="logo-text"
        />
        <cs-search-bar
          class="navbar__search-bar"
          @input="onSearch"
          v-model="query"
        ></cs-search-bar>
        <cs-profile
          v-if="$auth.$state.loggedIn"
          avatar-position="left"
          :picture="$auth.$state.user.photo"
          :name="name"
          :detail="$auth.$state.user.username"
          :style="{ '--cs-profile-card-background': '#F5F5F5' }"
          @click="goToProfilePage"
        >
        </cs-profile>
      </div>
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
  </div>
</template>

<script>
import Navbar from "vue-navbar-component";

export default {
  components: {
    Navbar,
  },
  async fetch() {
    this.categories = await fetch("http://localhost:3000/api/categories").then(
      (res) => res.json()
    );
  },
  data() {
    return {
      logo: {
        img: "https://picsum.photos/203",
        text: "TRUSTER",
      },
      categories: [],
      query: "",
    };
  },
  computed: {
    links() {
      let linksIfLoggedIn = [
        {
          name: "Home",
          click: () => this.$router.push("/"),
        },
      ];
      let linksIfNotLoggedIn = [
        {
          name: "Home",
          click: () => this.$router.push("/"),
        },
      ];
      if (this.categories.categories && this.categories.categories.length > 0) {
        this.categories.categories.forEach((element) => {
          linksIfLoggedIn.push({
            name: element.type,
            click: () => this.$router.push(`/articles/category/${element._id}`),
          });
          linksIfNotLoggedIn.push({
            name: element.type,
            click: () => this.$router.push(`/articles/category/${element._id}`),
          });
        });
      }
      return this.$auth.$state.loggedIn ? linksIfLoggedIn : linksIfNotLoggedIn;
    },
    name() {
      return (
        this.$auth.$state.user.firstName + " " + this.$auth.$state.user.lastName
      );
    },
  },
  methods: {
    async onLogout() {
      await this.$auth.logout();
    },
    goToProfilePage() {
      this.$router.push("/profile");
    },
    onSearch() {
      this.$router.push({
        path: "/search",
        query: { title: this.query },
      });
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}
* >>> .cs-profile__content-detail {
  margin: 0px !important;
}
* >>> .vue-navbar-links-container {
  margin-left: 50px !important;
}
.navbar__search-bar {
  width: 350px;
}
</style>
