<template>
  <cs-modal :backdrop="backdrop" @close="onClose" :show="show">
    <div slot="header">Share Article</div>
    <div slot="body" class="share-networks">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :url="sharing.url"
        :title="sharing.title"
        :style="{ backgroundColor: network.color }"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
        class="share-network"
      >
        <div class="share-network-content">
          <fa :icon="network.icon" />
          <span>{{ network.name }}</span>
        </div>
      </ShareNetwork>
    </div>
    <cs-button slot="main" @click="onClose" variant="default">Cancel</cs-button>
  </cs-modal>
</template>

<script>
export default {
  data() {
    return {
      backdrop: true,
      sharing: {
        url: `https://truster-news.herokuapp.com/articles/${this.article._id}`,
        title: this.article.title,
        quote: this.article.description,
        description: this.article.description,
        hashtags: "truster",
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "envelope",
          color: "#333333",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        {
          network: "reddit",
          name: "Reddit",
          icon: "fab fah fa-lg fa-reddit-alien",
          color: "#ff4500",
        },
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa-skype",
          color: "#00aff0",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "tumblr",
          name: "Tumblr",
          icon: "fab fah fa-lg fa-tumblr",
          color: "#35465c",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
  props: ["show", "article"],
  methods: {
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style scoped>
.share-networks {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.share-network {
  margin: 10px;
  display: flex;
  font-size: 24px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  align-items: center;
  align-content: center;
  justify-content: space-around;
}
.share-network-content {
}
</style>
