<template>
  <div class="loading">
    <p class="loading-text">Verifying article. Please wait!</p>
    <cs-spinner
      :style="{ '--cs-spinner-color': '#00c472' }"
      type="circles"
    ></cs-spinner>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss" scoped>
.loading {
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  //   @keyframes spin {
  //     to {
  //       transform: rotateZ(360deg);
  //     }
  //   }

  //   span {
  //     display: block;
  //     width: 60px;
  //     height: 60px;
  //     margin: 0 auto;
  //     border: 3px solid transparent;
  //     border-top-color: white;
  //     border-bottom-color: white;
  //     border-radius: 50%;
  //     animation: spin ease 1000ms infinite;
  //   }
}
.loading-text {
  color: #00c472;
  font-size: 24px;
}
</style>
