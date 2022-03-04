<template>
  <div>
    <p>{{ author.userID.firstName }}</p>
    <p>{{ author.userID.lastName }}</p>
    <p>{{ author.userID.email }}</p>
    <p>{{ author.trust }}</p>
    <client-only>
      <cs-avatar size="large" :picture="photo" :name="name" />
      <articles-list :articles="articles" />
    </client-only>
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
export default {
  components: { ArticlesList },
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/authorsdetail/${params.id}`
      );
      return {
        author: response.author,
        articles: response.articles,
      };
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    authorId() {
      return this.$route.params.id;
    },
    photo() {
      return this.author.userID.photo;
    },
    name() {
      return this.author.userID.firstName + " " + this.author.userID.lastName;
    },
  },
};
</script>

<style></style>
