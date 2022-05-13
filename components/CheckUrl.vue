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

import { vueUidMixin } from "vue-uid";
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
      let data = {
        url: this.url,
        uid: this.uuidv4(),
      };
      this.loading = true;
      try {
        let response = await this.$axios.$post("/api/checkurl", data);
        let finalResult = response.result;
        if (finalResult) {
          this.loading = false;
          var s = Number(finalResult).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          });
          this.result = s;
          console.log("tareeeeeeeeeeee2");
        }
        console.log(response);
      } catch (err) {
        console.log(err);
        if (err) {
          let interval = setInterval(async () => {
            let checkResult = await this.$axios.$get(`/api/eval/${data.uid}`);
            if (checkResult.success && checkResult.eval) {
              finalResult = checkResult.eval.result;
              this.loading = false;
              var s = Number(finalResult).toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 2,
              });
              this.result = s;
              console.log("tareeeeeeeeeeee");
              clearInterval(interval);
            }
          }, 10000);
        }
        console.log(err);
      }
    },
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
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
