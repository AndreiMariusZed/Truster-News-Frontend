<template>
  <div class="check-url">
    <client-only>
      <p class="cs-textstyle-paragraph">Check if an article is trustworthy</p>
      <cs-input type="text" v-model="url" />
      <cs-button @click="checkUrl">Check</cs-button>
      <!-- <cs-spinner></cs-spinner> -->
      <circles v-if="loading" />
      <span v-if="result && !loading">{{ result }} Credibility</span>
    </client-only>
  </div>
</template>

<script>
import Circles from "./Circles.vue";
export default {
  data() {
    return {
      url: "",
      result: "",
      loading: false,
    };
  },
  methods: {
    async checkUrl() {
      try {
        this.loading = true;
        let data = {
          url: this.url,
        };
        let response = await this.$axios.$post("/api/checkurl", data);
        if (response.success) {
          this.loading = false;
          var s = Number(response.result).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          });
          this.result = s;
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.check-url {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
}
</style>
