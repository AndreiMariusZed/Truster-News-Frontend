<template>
  <div @click="goToArticleURL">
    <cs-article-card
      :picture="article.urlToImage"
      :title="article.title"
      :summary="article.description"
      :author="article.source.name"
      :duration="article.duration"
    >
      <i class="cs-icons-share" slot="options"></i>
    </cs-article-card>
  </div>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    goToArticleURL() {
      console.log();
      window.open(this.article.url);
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
