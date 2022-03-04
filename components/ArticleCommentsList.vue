<template>
  <div>
    <article-comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    />
  </div>
</template>

<script>
import ArticleComment from "@/components/ArticleComment.vue";

export default {
  components: {
    ArticleComment,
  },
  props: ["comments"],
};
</script>
