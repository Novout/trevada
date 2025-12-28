
<template>
  <font-awesome-icon id="__spinner" icon="spinner" />
</template>

<style lang="scss" scoped>
#__spinner {
  font-size: 8rem;
  margin-top: 10rem;
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  0% {
    transform:rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform:rotate(360deg);
    opacity: 1;
  }
}
</style>
