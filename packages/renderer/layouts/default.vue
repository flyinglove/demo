<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.08), transparent 45%),
    radial-gradient(circle at bottom, rgba(59, 130, 246, 0.05), transparent 40%), #f1f5f9;
}
</style>
