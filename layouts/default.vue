<template>
  <div>
    <Navbar2 />
    <b-container class="content">
      <b-row>
        <b-col xl="2">
          <left-sidebar />
        </b-col>
        <b-col xl="7">
          <nuxt />
        </b-col>
        <b-col xl="3">
          <check-url />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Navbar2 from "@/components/Navbar2.vue";
import Footer from "@/components/Footer.vue";
import LeftSidebar from "@/components/LeftSidebar.vue";
import CheckUrl from "@/components/CheckUrl.vue";

export default {
  components: {
    Navbar2,
    Footer,
    LeftSidebar,
    CheckUrl,
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
