<template>
  <div>
    <p>Home page</p>
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
    return {};
  },
  // methods: {
  //   fetchTopNews() {
  //     this.apiURL =
  //       "https://newsapi.org/v2/top-headlines?country=us&apiKey=664e231e8ae34987a0aae960a8fab892";
  //     console.log("123");
  //     this.fetchData();
  //   },
  //   fetchData() {
  //     let req = new Request(this.apiURL);
  //     console.log(req);
  //     fetch(req)
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         this.totalResults = data.totalResults;
  //         data.articlesTop.forEach((element) => {
  //           this.articlesTop.push(element);
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
  //   async mymethod(x) {
  //     alert(x);
  //   },
  // },
  // created() {
  //   this.fetchTopNews();
  // },
};
</script>
