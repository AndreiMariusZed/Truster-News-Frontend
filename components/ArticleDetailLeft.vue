<template>
  <div class="scrollable">
    <client-only>
      <img :src="article.photo" alt="" class="article-img" />
      <p>{{ article.title }}</p>
      <p>{{ article.trustworthy }} credibility</p>
      <p>{{ article.categoryID.type }}</p>
      <p>
        {{ article.authorID.userID.firstName }}
        {{ article.authorID.userID.lastName }}
      </p>
      <p>{{ article.views }} views</p>
      <p>{{ article.duration }}</p>
      <div v-html="article.content"></div>
      <br />
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 85vh;
  background: white;
}
</style>
