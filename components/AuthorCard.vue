<template>
  <div class="publisher-circle-container">
    <client-only>
      <div class="publisher-circle">
        <cs-profile
          v-if="author.userID"
          :to="toAuthorDetailPage"
          :name="name"
          avatar-size="medium"
          :detail="description"
          :picture="author.userID.photo"
          class="author-profile"
        >
        </cs-profile>
        <cs-button @click="followAuthor">{{ buttonText }}</cs-button>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["author"],
  computed: {
    toAuthorDetailPage() {
      return `/authorprofile/${this.author._id}`;
    },
    name() {
      return this.author.userID.firstName + " " + this.author.userID.lastName;
    },
    description() {
      return this.author.trust + " Credibility";
    },
    buttonText() {
      return this.$auth.$state.user &&
        this.$auth.$state.user.followedAuthors &&
        this.$auth.$state.user.followedAuthors.find(
          (x) => x._id === this.author._id
        )
        ? "Unfollow"
        : "Follow";
    },
  },
  methods: {
    async followAuthor() {
      let authorID = {
        authorID: this.author._id,
      };
      let response = null;
      try {
        if (
          this.$auth.$state.user &&
          this.$auth.$state.user.followedAuthors &&
          this.$auth.$state.user.followedAuthors.find(
            (x) => x._id === this.author._id
          )
        ) {
          console.log("remove author");
          response = await this.$axios.$delete(
            `/api/removefollow/${this.$auth.$state.user._id}`,
            { data: { id: this.author._id } }
          );
        } else {
          console.log("follow author");
          response = await this.$axios.put(`/api/followauthor`, authorID);
        }
        console.log(response, response.status);
        if (
          response &&
          (response.status === 200 || response.success === true)
        ) {
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
.publisher-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 150px;
  height: 225px;
  background-color: white;
}
.author-profile {
  width: fit-content;
}
.publisher-circle-container {
  width: fit-content;
}
</style>
