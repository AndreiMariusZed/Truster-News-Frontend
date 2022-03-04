<template>
  <div>
    <p>Home page</p>
    <nuxt-link
      to="/create"
      v-if="$auth.$state.user && $auth.$state.user.isAuthor"
      >Create Article</nuxt-link
    >
    <nuxt-link
      to="/application"
      v-if="$auth.$state.user && !$auth.$state.user.isAuthor"
      >Apply to become an author</nuxt-link
    >
    <!-- <client-only v-if="articles">
      <articles-list :articles="articles"
    /></client-only> -->
    <articles-list :articles="articles" />
    <!-- <article-card
      v-for="article in articles"
      :key="article.objectID"
      :article="article"
    /> -->
  </div>
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  layout: "default",
  components: { ArticleCard },
  watchQuery: ["title"],
  async asyncData({ $axios, query }) {
    console.log(query.title);
    try {
      let response = await $axios.$post("http://localhost:3000/api/search", {
        title: query.title,
      });
      console.log(response);
      return {
        articles: response.articles.hits,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
