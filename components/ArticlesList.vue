<template>
  <div class="articles-list">
    <article-card
      v-for="article in articles"
      :key="article._id"
      :article="article"
    />
  </div>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
export default {
  components: { ArticleCard },
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
}
.articles-list >>> .cs-article-card {
  width: 350px;
}
</style>
