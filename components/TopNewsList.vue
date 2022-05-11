<template>
  <div class="articles-list">
    <top-news-card
      v-for="article in articles"
      :key="article._id"
      :article="article"
    />
  </div>
</template>

<script>
import TopNewsCard from "./TopNewsCard.vue";
export default {
  components: { TopNewsCard },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.articles-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.articles-list >>> .cs-article-card {
  /* width: 350px; */
}
</style>
