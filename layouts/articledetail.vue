<template>
  <div>
    <Navbar2 />
    <b-container class="content">
      <b-row>
        <nuxt />
      </b-row>
    </b-container>
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

<style>
.content {
  padding-top: 90px;
}
body {
  background-color: #f8f8f8;
}
</style>
