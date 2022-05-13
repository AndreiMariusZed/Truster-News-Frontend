<template>
  <div v-if="article">
    <b-container>
      <b-row>
        <b-col xl="8">
          <article-detail-left :article="article" />
        </b-col>
        <b-col xl="4">
          <article-detail-comments :article="article" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ArticleDetailLeft from "@/components/ArticleDetailLeft.vue";
import ArticleDetailComments from "@/components/ArticleDetailComments.vue";

export default {
  layout: "articledetail",
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/api/articles/${params.id}`);
      return {
        article: response.article,
      };
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    ArticleDetailLeft,
    ArticleDetailComments,
  },
  mounted() {
    this.addRecentlyViewed();
    let viewedArticles =
      JSON.parse(localStorage.getItem("viewedArticles")) || [];
    let viewedArticleId = this.$route.params.id;
    if (viewedArticles.includes(viewedArticleId)) {
      console.log("DEJA VAZUT");
    } else {
      this.viewArticle();
      viewedArticles.push(viewedArticleId);
      localStorage.setItem("viewedArticles", JSON.stringify(viewedArticles));
    }
  },
  methods: {
    async viewArticle() {
      const views = this.article.views + 1;
      let data = {
        views: views,
      };
      console.log(views);
      try {
        let response = await this.$axios.$put(
          `/api/viewarticle/${this.article._id}`,
          data
        );
        if (response.success) {
          console.log("AM VAZUT ARTICOLUL");
          await this.$nuxt.refresh();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addRecentlyViewed() {
      console.log("Add to recently viewed");
      let articleID = {
        articleID: this.article._id,
      };
      try {
        let response = await this.$axios.put(
          `/api/addrecently/${this.$auth.$state.user._id}`,
          articleID
        );
        console.log(response.status < 399);
        if (response.status < 399) {
          console.log("articol adaugat la recently");
          // await this.$nuxt.refresh();
        } else {
          console.log("articol nu a fost adaugat la recently");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped></style>
