<template>
  <div>
    <client-only>
      <div class="top-bar">
        <cs-profile
          avatar-position="left"
          :name="authorName"
          detail="Author"
          :picture="article.authorID.userID.photo"
          :to="toAuthorDetailPage"
        >
        </cs-profile>
        <cs-button
          v-if="isTheAuthorOfTheArticle"
          :to="toEditArticle"
          class="edit-button"
          >Edit Article</cs-button
        >
      </div>
      <div class="scrollable comments-list-container" id="container">
        <article-comments-list :comments="article.comments" />
      </div>
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
    </client-only>
  </div>
</template>

<script>
import ArticleCommentsList from "@/components/ArticleCommentsList.vue";
export default {
  components: {
    ArticleCommentsList,
  },
  props: ["article"],
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
    isTheAuthorOfTheArticle() {
      if (this.$auth.$state.loggedIn) {
        if (this.$auth.$state.user.isAuthor) {
          if (this.$auth.$state.user.authorID === this.article.authorID._id)
            return true;
          else return false;
        } else return false;
      } else return false;
    },
  },
  methods: {
    async insertComment() {
      let comment = {
        author: {
          name: this.$auth.$state.user.username,
          picture: this.$auth.$state.user.photo,
          date: new Date(),
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
          var container = this.$el.querySelector("#container");
          await this.$nuxt.refresh();
          container.scrollTop = container.scrollHeight;
        } else {
          console.log("comentariul nu a fost adaugat");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 68vh;
}
.comments-list-container {
  background: white;
}
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
}
.edit-button {
  margin-right: 20px;
}
</style>
