<template>
  <div>
    <cs-comment
      :author="comment.author"
      :message="comment.message"
      :counters="[]"
      :action-buttons="[]"
    >
    </cs-comment>
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style></style>
