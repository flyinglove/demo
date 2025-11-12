<template>
  <aside class="sidebar">
    <header>
      <h2>组件库</h2>
      <p>拖拽到画布或点击快速添加到当前容器。</p>
    </header>

    <section class="section">
      <h3>布局容器</h3>
      <div
        class="sidebar-card"
        draggable="true"
        @dragstart="(event) => startDrag(event, { kind: 'container' })"
        @click="() => quickAdd({ kind: 'container' })"
      >
        <strong>容器</strong>
        <p>可嵌套、可配置的布局容器。</p>
      </div>
    </section>

    <section class="section">
      <h3>内容组件</h3>
      <div
        v-for="component in components"
        :key="component.type"
        class="sidebar-card"
        draggable="true"
        @dragstart="(event) => startDrag(event, { kind: 'component', component: component.type })"
        @click="() => quickAdd({ kind: 'component', component: component.type })"
      >
        <strong>{{ component.label }}</strong>
        <p>{{ component.description }}</p>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { componentRegistry } from '../registry';
import type { DragPayload } from '../types';

const emit = defineEmits<{
  (event: 'node-drop-intent', payload: DragPayload): void;
}>();

const components = componentRegistry;

function startDrag(event: DragEvent, payload: DragPayload) {
  event.dataTransfer?.setData('application/x-page-node', JSON.stringify(payload));
  event.dataTransfer?.setData('text/plain', payload.kind);
  event.dataTransfer?.effectAllowed = 'copy';
}

function quickAdd(payload: DragPayload) {
  emit('node-drop-intent', payload);
}
</script>

<style scoped>
.sidebar {
  background: #0f172a;
  color: white;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

header h2 {
  margin: 0 0 8px;
}

header p {
  margin: 0;
  color: rgba(255, 255, 255, 0.65);
}

.section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section h3 {
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-card {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: grab;
  transition: transform 0.15s ease, border-color 0.15s ease;
}

.sidebar-card:active {
  cursor: grabbing;
}

.sidebar-card:hover {
  transform: translateY(-2px);
  border-color: rgba(96, 165, 250, 0.8);
}

.sidebar-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>
