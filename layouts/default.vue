<template>
  <div>
    <Navbar2 />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar2 from "@/components/Navbar2.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar2,
    Footer,
  },
};
</script>
<style></style>
