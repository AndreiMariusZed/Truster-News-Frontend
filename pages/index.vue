<template>
  <div>
    <client-only v-if="articles">
      <articles-list :articles="articles" />
    </client-only>
  </div>
</template>

<script>
import ArticlesList from "../components/ArticlesList.vue";
export default {
  layout: "default",
  components: { ArticlesList },
  async asyncData({ $axios }) {
    try {
      let articles = $axios.$get("http://localhost:3000/api/articles");
      const [articlesResponse] = await Promise.all([articles]);
      return {
        articles: articlesResponse.articles,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
