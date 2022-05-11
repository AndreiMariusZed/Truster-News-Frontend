<template>
  <div class="navbar-parent">
    <client-only>
      <b-container class="navbar2">
        <div class="logo-and-name" @click="goToHomePage">
          <img src="https://picsum.photos/203" alt="" class="logo" />
          <h1 class="name">TRUSTER</h1>
        </div>
        <cs-search-bar
          class="search-bar"
          @input="onSearch"
          v-model="query"
        ></cs-search-bar>
        <cs-button
          to="/create"
          fill="outline"
          variant="info"
          v-if="$auth.$state.user && $auth.$state.user.isAuthor"
          >Create Article</cs-button
        >
        <cs-button
          to="/application"
          fill="outline"
          variant="default"
          v-if="$auth.$state.user && !$auth.$state.user.isAuthor"
          >Become an author</cs-button
        >
        <cs-avatar
          v-if="$auth.$state.loggedIn"
          :picture="$auth.$state.user.photo"
          :name="name"
          id="popover-target-1"
        >
        </cs-avatar>
        <b-popover
          target="popover-target-1"
          triggers="click blur"
          placement="leftbottom"
        >
          <div>
            <div class="profile-menu-header">
              <cs-profile
                v-if="$auth.$state.loggedIn"
                avatar-position="left"
                :picture="$auth.$state.user.photo"
                :name="name"
                :detail="$auth.$state.user.username"
                :style="{ '--cs-profile-card-background': '#F5F5F5' }"
                @click="goToProfilePage"
                id="popover-target-1"
              >
              </cs-profile>
            </div>
            <div class="profile-menu-body">
              <div class="profile-menu-item cursor-pointer">
                <i class="ch-icons-user"></i>
                View Profile
              </div>
              <div class="profile-menu-item cursor-pointer">
                <i class="cs-icons-settings"></i>
                Settings
              </div>
              <div class="profile-menu-item cursor-pointer">
                <i class="cs-icons-help"></i>
                Report a Bug
              </div>
              <div class="profile-menu-item" @click="onLogout">
                <i class="ch-icons-logout"></i>
                Sign Out
              </div>
            </div>
          </div>
        </b-popover>
        <div v-if="!$auth.$state.loggedIn">
          <cs-button @click="$router.push('/signup')">Sign Up</cs-button>
          <cs-button @click="$router.push('/login')">Login</cs-button>
        </div>
      </b-container>
    </client-only>
  </div>
</template>

<script>
import Navbar from "vue-navbar-component";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
    };
  },
  computed: {
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
    goToHomePage() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>

<style scoped>
.navbar-parent {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
}
.navbar2 {
  display: flex;
  padding: 12px 0px;
  justify-content: space-between;
  align-items: center;
}
.navbar2 > * {
  vertical-align: middle;
}
.navbar2 .cs-button {
  margin-right: 20px;
}
.search-bar {
  width: 50%;
}
* >>> .cs-profile__content-detail {
  margin: 0px !important;
}
* >>> .vue-navbar-links-container {
  margin-left: 50px !important;
}
* >>> .cs-profile__main {
  padding: 0px !important;
}
.profile-menu-header {
  display: flex;
  align-items: center;
  border-bottom: solid 1px var(--cs-gray-01);
  padding-bottom: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.profile-menu-item {
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.logo-and-name {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.logo {
  height: 50px;
  width: 50px;
}
.name {
  margin: 0px 0px 0px 20px;
  vertical-align: middle;
}
</style>
