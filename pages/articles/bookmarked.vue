<template>
  <client-only>
    <div>
      <articles-list :articles="bookmarkedArticles" />
    </div>
  </client-only>
</template>

<script>
import ArticlesList from "@/components/ArticlesList.vue";
export default {
  components: {
    ArticlesList,
  },
  computed: {
    bookmarkedArticles() {
      return this.$auth.$state.user.bookmarkedArticles;
    },
  },
};
</script>

<style></style>
