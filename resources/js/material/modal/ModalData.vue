<template>
  <section class="modal">
    <section class="modal__header">
      <slot name="header" />
    </section>
    <section class="modal__content">
      <slot name="content" />
    </section>
  </section>
</template>

<style lang="scss" scoped>
.modal {
  @include fixed-center;
  height: 400px;
  width: 450px;
  overflow: auto;
  @include bg($campaign-background);
  @include shadow;
  @include rounded('top');
  .modal__header {
    @include full-w;
  }
  .modal__content {
    @include full-w;
  }
}
</style>
