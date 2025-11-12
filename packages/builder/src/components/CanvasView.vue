<template>
  <section class="canvas">
    <div class="canvas-inner">
      <ContainerNode
        :node="root"
        :selected-id="selectedId"
        :level="0"
        @select="emit('select', $event)"
        @drop-node="emit('drop-node', $event.targetId, $event.payload)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ContainerNode from './ContainerNode.vue';
import type { ContainerNode as ContainerNodeType, DragPayload } from '../types';

defineProps<{
  root: ContainerNodeType;
  selectedId: string;
}>();

const emit = defineEmits<{
  (event: 'select', nodeId: string): void;
  (event: 'drop-node', targetId: string, payload: DragPayload): void;
}>();
</script>

<style scoped>
.canvas {
  flex: 1;
  overflow: auto;
  background: repeating-linear-gradient(
    45deg,
    #f1f5f9,
    #f1f5f9 20px,
    #e2e8f0 20px,
    #e2e8f0 40px
  );
  border-radius: 16px;
  padding: 32px;
}

.canvas-inner {
  min-height: 80vh;
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  box-shadow: 0 16px 45px rgba(15, 23, 42, 0.12);
}
</style>
