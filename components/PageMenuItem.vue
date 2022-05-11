<template>
  <nuxt-link :to="to" class-active="active" class="page-link">
    {{ label }}
  </nuxt-link>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
.page-link {
  color: var(--cs-gray-05);
  background-color: inherit;
  border-style: none;
  font-size: var(--cs-font-size-50);
  font-weight: 500;
  border-left: solid 3px transparent;
  box-shadow: none !important;
}
.page-link:hover {
  color: var(--cs-gray-08);
  background-color: inherit;
  box-shadow: none !important;
}
.page-link .active,
.nuxt-link-active {
  border-left-color: var(--cs-primary-base) !important;
  background-color: var(--cs-gray-00) !important;
  color: var(--cs-primary-base) !important;
  border-color: inherit !important;
  box-shadow: none !important;
}
</style>
