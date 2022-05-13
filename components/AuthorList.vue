<template>
  <div class="authors-list">
    <author-card v-for="author in authors" :key="author._id" :author="author" />
  </div>
</template>

<script>
import AuthorCard from "@/components/AuthorCard.vue";
export default {
  components: { AuthorCard },
  props: ["authors"],
};
</script>

<style scoped>
.authors-list {
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-columns: 25% 25% 25% 25%;
}
</style>
