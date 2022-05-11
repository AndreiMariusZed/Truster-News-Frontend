<template>
  <div>
    <author-list :authors="authors" />
  </div>
</template>

<script>
import AuthorList from "../components/AuthorList.vue";
export default {
  components: { AuthorList },
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("/api/mosttrustedauthors");
      return {
        authors: response.authors,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
