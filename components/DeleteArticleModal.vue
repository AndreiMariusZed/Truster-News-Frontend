<template>
  <cs-modal :backdrop="backdrop" @close="onClose" :show="show">
    <div slot="header">Delete Article</div>
    <div slot="body">
      <p>Are you sure you want to delete this article?</p>
    </div>
    <cs-button slot="main" @click="onClose" variant="default">Cancel</cs-button>
    <cs-button slot="main" @click="onDelete" variant="danger">Delete</cs-button>
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
    onDelete() {
      this.$emit("onDelete");
    },
  },
};
</script>

<style scoped>
.share-network {
  margin: 10px;
}
</style>
