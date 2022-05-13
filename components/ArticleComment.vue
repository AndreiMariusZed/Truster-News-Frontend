<template>
  <div class="article-comment">
    <cs-comment
      :author="comment.author"
      :message="comment.message"
      :date="comment.author.date"
    >
    </cs-comment>
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style scoped>
.article-comment {
  margin-bottom: 15px;
  padding: 10px;
}
.article-comment >>> .cs-comment__content {
  background-color: #f8f8f8 !important;
}
</style>
