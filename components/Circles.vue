<template>
  <div>
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
    <div class="div"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes scaling {
  0%,
  100% {
    transform: scale(0.2);
    background-color: #30ffb7;
  }
  40% {
    transform: scale(1);
    background-color: #07deff;
  }
  50% {
    transform: scale(1);
    background-color: #0761ff;
  }
}

.div {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  transform: scale(0);
  background-color: red;
  animation: scaling 2.5s ease-in-out infinite;
  display: inline-block;
  margin: 0.5rem;
}

div:nth-child(0) {
  animation-delay: 0s;
}
div:nth-child(1) {
  animation-delay: 0.2s;
}
div:nth-child(2) {
  animation-delay: 0.4s;
}
div:nth-child(3) {
  animation-delay: 0.6s;
}
div:nth-child(4) {
  animation-delay: 0.8s;
}
div:nth-child(5) {
  animation-delay: 1s;
}
</style>
