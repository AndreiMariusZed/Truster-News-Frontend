<template>
  <div class="left-sidebar">
    <app-page-menu title="News">
      <!-- Latest Section -->
      <app-page-menu-item
        label="Most Trusted News"
        :to="`/articles/mosttrusted`"
      />
      <app-page-menu-item
        label="Most Trusted Authors"
        :to="`/trustedauthors`"
      />
      <app-page-menu-item
        label="Recently Viewed Articles"
        :to="`/articles/recentlyviewed`"
      />
      <app-page-menu-item label="External News" :to="`/articles/external`" />

      <app-page-menu title="Categories" no-border>
        <div class="topics">
          <app-page-menu-item
            v-for="category in categories.categories"
            :key="category.type"
            :label="category.type"
            :to="`/articles/category/${category._id}`"
          />
        </div>
      </app-page-menu>
    </app-page-menu>
  </div>
</template>

<script>
import AppPageMenu from "@/components/PageMenu.vue";
import AppPageMenuItem from "@/components/PageMenuItem.vue";
export default {
  components: {
    AppPageMenu,
    AppPageMenuItem,
  },
  data() {
    return {
      categories: [],
    };
  },
  async fetch() {
    this.categories = await fetch("http://localhost:3000/api/categories").then(
      (res) => res.json()
    );
  },
};
</script>

<style scoped>
.left-sidebar {
  padding-top: 20px;
}
.topics {
  padding-left: 30px;
}
</style>
