<template>
  <div>
    <articles-list :articles="articles" />
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
      let response = await $axios.$post("/api/search", {
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
