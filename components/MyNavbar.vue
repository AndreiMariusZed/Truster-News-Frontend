<template>
  <b-navbar class="navbar ch-menu">
    <b-container fluid="xl">
      <b-navbar-brand :to="{ name: 'Home' }" class="navbar-brand">
        <img src="https://picsum.photos/203" width="120px" />
      </b-navbar-brand>
      <!-- <app-search-bar /> -->
      <cs-search-bar @input="onSearch" v-model="query"></cs-search-bar>
      <!-- Icons for md size -->
      <b-navbar-nav class="link-bar d-lg-none">
        <b-nav-item
          v-for="link in links"
          :key="'nav-icon-' + link.to"
          :to="{ name: link.to, params: link.params }"
          active-class="active-link"
        >
          <b-nav-text :title="link.name" @click="changeTab(link)">
            <i class="tab-icon" :class="link.icon" />
          </b-nav-text>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Text tabs for lg+ size -->
      <b-navbar-nav class="link-bar d-none d-lg-flex">
        <b-nav-item
          v-for="link in links"
          :key="link.to"
          :to="{ name: link.to, params: link.params }"
          active-class="active-link"
        >
          <b-nav-text @click="changeTab(link)">{{ link.name }}</b-nav-text>
        </b-nav-item>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  async fetch() {
    this.categories = await fetch("http://localhost:3000/api/categories").then(
      (res) => res.json()
    );
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
  data() {
    return {
      categories: [],
      query: "",
    };
  },
  methods: {
    selectSearch() {
      this.$refs.input.focus();
    },
    changeTab(link) {
      if (this.$route.name === link.to) {
        this.$router.topScroll();
      }
    },
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
.ch-menu {
  padding: 0;
  box-shadow: 0px 3px 6px #0000000d;
}
.navbar {
  background: #ffffff 0% 0% no-repeat padding-box;
}
.link-bar {
  color: var(--gray-05);
  text-align: left;
  font: normal normal bold 16px/24px Roboto;
  letter-spacing: 0px;
  color: #47535a;
  opacity: 1;
  justify-content: center;
}
.active-link {
  color: var(--cs-primary-base) !important;
  border-bottom: solid 3px var(--cs-primary-base);
}
.ch-menu .navbar-nav .nav-link {
  padding: 0 18px;
  line-height: 58px;
}
.ch-menu .navbar-nav .nav-link .navbar-text {
  line-height: 41px;
  font-weight: 700;
  color: inherit;
}
.menu-icons {
  display: flex;
  font-size: 20px;
  align-items: center;
}
.menu-icons > * {
  cursor: pointer;
}
.menu-icon {
  margin-left: 25px;
}
.tab-icon {
  font-size: 20px;
  display: block;
  margin-bottom: -3px;
}
.search-bar {
  flex: 1;
  margin: 0px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: solid 1px var(--cs-gray-02);
  border-radius: 4px;
  padding-left: 10px;
  overflow: hidden;
}
.search-bar i {
  cursor: pointer;
}
.search-bar input {
  width: 100%;
  border: none;
  height: 38px;
  padding: 10px;
  outline-width: 0;
}
</style>
