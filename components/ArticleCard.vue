<template>
  <div>
    <div @click="goToArticleDetail" v-if="article.authorID">
      <cs-article-card
        :picture="article.photo"
        :title="article.title"
        :summary="article.description"
        :author="article.authorID.userID.username"
        :duration="article.duration"
      >
        <i
          class="cs-icons-delete"
          slot="options"
          v-if="isTheAuthorOfTheArticle"
          @click.stop="deleteArticle"
        ></i>
        <i
          class="cs-icons-edit"
          slot="options"
          v-if="isTheAuthorOfTheArticle"
          @click.stop="editArticle"
        ></i>
        <i
          class="bookmark-button"
          :class="[{ active: article.isBookmarked }, filled]"
          slot="options"
          @click.stop="bookmarkArticle"
        ></i>
        <i class="cs-icons-share" slot="options" @click.stop="shareArticle"></i>
      </cs-article-card>
    </div>
    {{ article.isBookmarked }}
    <social-share-modal
      :show="showSocialShareModal"
      :article="article"
      @onClose="close"
    />
    <delete-article-modal
      :show="showDeleteArticleModal"
      :article="article"
      @onClose="close"
      @onDelete="onDelete"
    />
  </div>
</template>
<script>
import SocialShareModal from "@/components/SocialShareModal.vue";
import DeleteArticleModal from "@/components/DeleteArticleModal.vue";

export default {
  components: {
    SocialShareModal,
    DeleteArticleModal,
  },
  data() {
    return {
      showSocialShareModal: false,
      showDeleteArticleModal: false,
    };
  },
  props: ["article"],
  methods: {
    goToArticleDetail() {
      this.$router.push(`/articles/${this.article._id}`);
    },
    shareArticle(event) {
      event.preventDefault();
      this.showSocialShareModal = true;
    },
    deleteArticle() {
      this.showDeleteArticleModal = true;
    },
    editArticle() {
      this.$router.push(`/editarticle/${this.article._id}`);
    },
    async bookmarkArticle() {
      let articleID = {
        articleID: this.article._id,
      };
      let response = null;
      try {
        if (
          this.$auth.$state.user.bookmarkedArticles.indexOf(this.article._id) >
            -1 ===
          true
        ) {
          response = await this.$axios.$delete(
            `/api/removebookmark/${this.$auth.$state.user._id}`,
            { data: { id: this.article._id } }
          );
        } else {
          response = await this.$axios.$put(
            `/api/addbookmark/${this.$auth.$state.user._id}`,
            articleID
          );
        }
        console.log(response.status < 399);
        if (response && response.success === true) {
          console.log("asdasdasdas");
          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log(err);
      }
    },
    close() {
      this.showSocialShareModal = false;
      this.showDeleteArticleModal = false;
    },
    async onDelete() {
      console.log("delete article");
      try {
        let response = await this.$axios.$delete(
          `/api/articles/${this.article._id}`
        );
        if (response.success) {
          this.showDeleteArticleModal = false;
          await this.$nuxt.refresh();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    isTheAuthorOfTheArticle() {
      if (this.$auth.$state.loggedIn) {
        if (this.$auth.$state.user.isAuthor) {
          if (this.$auth.$state.user.authorID === this.article.authorID._id)
            return true;
          else return false;
        } else return false;
      } else return false;
    },
    filled() {
      return this.$auth.$state.user &&
        this.$auth.$state.user.bookmarkedArticles &&
        this.$auth.$state.user.bookmarkedArticles.indexOf(this.article._id) > -1
        ? "cs-icons-bookmark-filled"
        : "cs-icons-bookmark";
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
.bookmark-button.active {
  color: var(--cs-primary-base);
}
</style>
