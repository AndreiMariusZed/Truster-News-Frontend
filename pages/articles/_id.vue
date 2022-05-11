<template>
  <div v-if="article">
    <p>{{ article.title }}</p>
    <p>{{ article.trustworthy }} credibility</p>
    <p>{{ article.categoryID.type }}</p>
    <p>
      {{ article.authorID.userID.firstName }}
      {{ article.authorID.userID.lastName }}
    </p>
    <client-only>
      <cs-profile
        avatar-position="left"
        :name="authorName"
        detail="Author"
        :picture="article.authorID.userID.photo"
        :to="toAuthorDetailPage"
      >
      </cs-profile>
      <p>{{ article.views }} views</p>
      <p>{{ article.duration }}</p>
      <cs-button :to="toEditArticle">Edit Article</cs-button>
      <img :src="article.photo" alt="" class="article-img" />
      <div v-html="article.content"></div>
      <br />
      <br />
      <article-comments-list :comments="article.comments" />
      <cs-message-box
        v-model="draftComment"
        class="post-comment-composer"
        placeholder="Write a comment...."
        variant="primary"
        show-border
        show-attachments
        @send="insertComment()"
      >
      </cs-message-box>
      <br />
      <br />
    </client-only>
  </div>
</template>

<script>
import ArticleCommentsList from "@/components/ArticleCommentsList.vue";

export default {
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
    ArticleCommentsList,
  },
  data() {
    return {
      draftComment: "",
    };
  },
  computed: {
    authorName() {
      return (
        this.article.authorID.userID.firstName +
        " " +
        this.article.authorID.userID.lastName
      );
    },
    toAuthorDetailPage() {
      return `/authorprofile/${this.article.authorID._id}`;
    },
    toEditArticle() {
      return `/editarticle/${this.article._id}`;
    },
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
    async insertComment() {
      let comment = {
        author: {
          name: this.$auth.$state.user.username,
          picture: this.$auth.$state.user.photo,
        },
        message: this.draftComment,
      };
      try {
        let response = await this.$axios.put(
          `/api/addcomment/${this.article._id}`,
          comment
        );
        console.log(response.status < 399);
        if (response.status < 399) {
          console.log("comentariu adaugat");
          await this.$nuxt.refresh();
        } else {
          console.log("comentariul nu a fost adaugat");
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

<style scoped>
.article-img {
  width: 300px;
  height: 200px;
}
.post-comment-composer {
  margin-bottom: 15px;
}
</style>
