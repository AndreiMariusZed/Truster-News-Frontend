<template>
  <div class="carousel-wrapper">
    <client-only>
      <carousel v-bind="options">
        <slide
          v-for="(author, index) in followedAuthors.length"
          :key="author._id"
          class="img-wrapper"
        >
          <author-card :author="followedAuthors[index]" />
        </slide>
      </carousel>
    </client-only>
  </div>
</template>

<script>
import AuthorCard from "@/components/AuthorCard.vue";
export default {
  components: { AuthorCard },
  data() {
    return {
      options: {
        loop: true,
        perPage: 4,
        paginationEnabled: false,
        autoplay: true,
        autoplayTimeout: 5000,
        navigationEnabled: true,
      },
    };
  },
  computed: {
    followedAuthors() {
      return this.$auth.$state.user.followedAuthors;
    },
  },
};
</script>

<style lang="scss">
.carousel-wrapper {
  padding: 20px 40px 40px 40px;
  height: 150px;
  .VueCarousel-slide {
    text-align: center;
  }
}
</style>
