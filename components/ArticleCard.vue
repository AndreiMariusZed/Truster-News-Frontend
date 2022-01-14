<template>
  <div @click="goToArticleDetail" v-if="article.authorID">
    <cs-article-card
      picture-position="top"
      :picture="article.photo"
      :title="article.title"
      :summary="article.description"
      :author="article.authorID.userID.username"
      :duration="article.duration"
    >
      <i class="cs-icons-delete" slot="options"></i>
      <i class="cs-icons-edit" slot="options"></i>
      <i class="cs-icons-share" slot="options"></i>
    </cs-article-card>
    <!-- {{ article }} -->
    <!-- 664e231e8ae34987a0aae960a8fab892 -->
  </div>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    goToArticleDetail() {
      this.$router.push(`/articles/${this.article._id}`);
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
</style>
