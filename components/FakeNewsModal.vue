<template>
  <cs-modal :backdrop="backdrop" @close="onClose" :show="show">
    <div slot="header">Fake news</div>
    <div slot="body">
      <p>You article seems to be fake.</p>
    </div>
    <cs-button slot="main" @click="onClose" variant="default">Cancel</cs-button>
  </cs-modal>
</template>

<script>
export default {
  data() {
    return {
      backdrop: true,
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
