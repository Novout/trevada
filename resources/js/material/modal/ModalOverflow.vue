<template>
  <section class="modal">
    <section class="modal__content">
      <slot />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.modal {
  @include page;
  @include bg(rgba(0, 0, 0, 0.75));
  @include fixed-center;
  .modal__content {
    @include fixed-center;
  }
}
</style>
