<template>
  <client-only>
    <div>
      <articles-list :articles="recentlyViewed" />
    </div>
  </client-only>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get(`/api/recentlyviewed`);
      return {
        recentlyViewed: response.recentlyViewed,
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
