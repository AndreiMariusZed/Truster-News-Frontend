<template>
  <div>
    <client-only>
      <articles-list :articles="articles" />
    </client-only>
  </div>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/mosttrusted");
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
