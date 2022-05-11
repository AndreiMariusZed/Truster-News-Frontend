<template>
  <div>
    <client-only>
      <div class="author-card">
        <cs-profile
          v-if="author.userID"
          :to="toAuthorDetailPage"
          :name="name"
          :detail="description"
          :picture="author.userID.photo"
          location="London"
          class="author-profile"
        >
        </cs-profile>
        <cs-button @click="followAuthor">Follow</cs-button>
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
  },
  methods: {
    async followAuthor() {
      console.log("follow author");
      let authorID = {
        authorID: this.author._id,
      };
      try {
        let response = await this.$axios.put(`/api/followauthor`, authorID);
        console.log(response.status < 399);
        if (response.status < 399) {
          console.log("author adaugat la follow");
          // await this.$nuxt.refresh();
        } else {
          console.log("author nu a fost adaugat la follow");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.author-card {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.author-profile {
  width: fit-content;
}
</style>
