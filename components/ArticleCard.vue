<template>
  <div>
    <div @click="goToArticleDetail" v-if="article.authorID">
      <cs-article-card
        picture-position="top"
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
      console.log("Add to bookmarks");
      let articleID = {
        articleID: this.article._id,
      };
      try {
        let response = await this.$axios.put(
          `/api/addbookmark/${this.$auth.$state.user._id}`,
          articleID
        );
        console.log(response.status < 399);
        if (response.status < 399) {
          console.log("articol adaugat la bookmark");
          await this.$nuxt.refresh();
        } else {
          console.log("articol nu a fost adaugat la bookmark");
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
          `http://localhost:3000/api/articles/${this.article._id}`
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
      return this.article.isBookmarked
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
