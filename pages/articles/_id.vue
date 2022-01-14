<template>
  <div>
    <p>{{ article.title }}</p>
    <p>{{ article.categoryID.type }}</p>
    <p>
      {{ article.authorID.userID.firstName }}
      {{ article.authorID.userID.lastName }}
    </p>
    <!-- {{ article.content }} -->
    <div v-html="article.content"></div>
    <!-- <img :src="article.photo" alt="" /> -->
    <!-- {{ article }} -->
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(
        `http://localhost:3000/api/articles/${params.id}`
      );
      return {
        article: response.article,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style></style>
