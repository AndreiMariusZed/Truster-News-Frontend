<template>
  <div>
    <p>Home page</p>
    <p>Check if an article is trustworthy</p>
    <input type="text" v-model="url" />
    <button @click="checkUrl">Check</button>
    <span v-if="result">{{ result }} Credibility</span>
    <br />

    <nuxt-link to="/articles/mosttrusted">Most Trusted News</nuxt-link>
    <br />
    <nuxt-link to="/trustedauthors">Most Trusted Authors</nuxt-link>
    <br />
    <nuxt-link to="/articles/recentlyviewed"
      >Recently Viewed Articles</nuxt-link
    >
    <br />
    <nuxt-link
      to="/create"
      v-if="$auth.$state.user && $auth.$state.user.isAuthor"
      >Create Article</nuxt-link
    >
    <nuxt-link
      to="/application"
      v-if="$auth.$state.user && !$auth.$state.user.isAuthor"
      >Apply to become an author</nuxt-link
    >
    <client-only v-if="articles">
      <articles-list :articles="articles" />
      <top-news-list :articles="topnews.articles" />
    </client-only>
  </div>
</template>

<script>
import ArticlesList from "../components/ArticlesList.vue";
import TopNewsList from "../components/TopNewsList.vue";
export default {
  layout: "default",
  components: { ArticlesList, TopNewsList },
  async asyncData({ $axios }) {
    try {
      let articles = $axios.$get("http://localhost:3000/api/articles");
      let topnews = $axios.$get("http://localhost:3000/api/topnews");
      const [articlesResponse, topnewsResponse] = await Promise.all([
        articles,
        topnews,
      ]);
      return {
        articles: articlesResponse.articles,
        topnews: topnewsResponse.topnews,
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      url: "",
      result: "",
    };
  },
  // mounted() {
  //   let x = this.$auth.$state.user.bookmarkedArticles;
  //   this.articles.forEach(function (article) {
  //     if (x.includes(article._id)) {
  //       article.isBookmarked = true;
  //     } else {
  //       article.isBookmarked = false;
  //     }
  //   });
  // },
  methods: {
    async checkUrl() {
      try {
        let data = {
          url: this.url,
        };
        let response = await this.$axios.$post("/api/checkurl", data);
        if (response.success) {
          var s = Number(response.result).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          });
          this.result = s;
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
