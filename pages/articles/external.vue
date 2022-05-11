<template>
  <div>
    <client-only v-if="topnews">
      <top-news-list :articles="topnews.articles" />
    </client-only>
  </div>
</template>

<script>
import TopNewsList from "@/components/TopNewsList.vue";
export default {
  components: { TopNewsList },
  async asyncData({ $axios }) {
    try {
      let topnews = $axios.$get("http://localhost:3000/api/topnews");
      const [topnewsResponse] = await Promise.all([topnews]);
      return {
        topnews: topnewsResponse.topnews,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
