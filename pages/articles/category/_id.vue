<template>
  <div>
    <articles-list :articles="articles" />
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
export default {
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/articlesbycategory/${params.id}`
      );
      return {
        articles: response.articles,
      };
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    ArticlesList,
  },
};
</script>

<style></style>
