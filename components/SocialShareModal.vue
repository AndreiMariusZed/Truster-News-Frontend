<template>
  <cs-modal :backdrop="backdrop" @close="onClose" :show="show">
    <div slot="header">Share this article to desired social media</div>
    <div slot="body">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :style="{ backgroundColor: network.color }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
        class="share-network"
      >
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
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
        // url: `https://localhost:8000/articles/${this.article._id}`,
        url: "https://www.npmjs.com/package/vue-social-sharing",
        title: this.article.title,
        description: this.article.description,
        hashtags: "truster",
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
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
          network: "messenger",
          name: "Messenger",
          icon: "fab fah fa-lg fa-facebook-messenger",
          color: "#0084ff",
        },
        {
          network: "pinterest",
          name: "Pinterest",
          icon: "fab fah fa-lg fa-pinterest",
          color: "#bd081c",
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
          network: "vk",
          name: "Vk",
          icon: "fab fah fa-lg fa-vk",
          color: "#4a76a8",
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
.share-network {
  margin: 10px;
}
</style>
