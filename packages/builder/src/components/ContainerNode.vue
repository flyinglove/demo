<template>
  <div class="container-node" :class="{ 'is-root': level === 0 }">
    <header class="container-toolbar">
      <button class="select" :class="{ active: isSelected }" @click.stop="selectNode">
        {{ level === 0 ? '根容器' : '容器' }} · {{ node.id }}
      </button>
      <span class="hint">宽度 {{ node.props.width }} · 高度 {{ node.props.height }} · 布局 {{ node.props.layout }}</span>
    </header>

    <div
      class="container-body"
      :class="{ selected: isSelected }"
      :style="containerStyle"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="onDragEnter"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click.stop="selectNode"
    >
      <template v-if="node.children.length">
        <template v-for="child in node.children" :key="child.id">
          <ContainerNode
            v-if="child.type === 'container'"
            :node="child"
            :selected-id="selectedId"
            :level="level + 1"
            @drop-node="forwardDrop"
            @select="emit('select', $event)"
          />
          <ComponentPreview v-else :node="child" :selected="selectedId === child.id" @select="emit('select', child.id)" />
        </template>
      </template>
      <div v-else class="empty-state">拖拽组件或容器到这里</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ComponentPreview from './ComponentPreview.vue';
import type { ContainerNode as ContainerNodeType, DragPayload } from '../types';

defineOptions({ name: 'ContainerNode' });

const props = defineProps<{
  node: ContainerNodeType;
  selectedId: string;
  level: number;
}>();

const emit = defineEmits<{
  (event: 'drop-node', payload: { targetId: string; payload: DragPayload }): void;
  (event: 'select', nodeId: string): void;
}>();

const isHovering = ref(false);

const isSelected = computed(() => props.selectedId === props.node.id);

const containerStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.node.props.layout,
  justifyContent: props.node.props.justify,
  alignItems: props.node.props.align,
  gap: `${props.node.props.gap}px`,
  padding: props.node.props.padding,
  width: props.node.props.width,
  minHeight: props.node.props.height === 'auto' ? '120px' : props.node.props.height,
  background: props.node.props.background,
  border: isHovering.value ? '2px dashed #2563eb' : '1px dashed #cbd5f5',
  borderRadius: '16px',
  transition: 'border 0.15s ease'
}));

function onDragOver(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy';
  }
}

function onDragEnter() {
  isHovering.value = true;
}

function onDragLeave() {
  isHovering.value = false;
}

function onDrop(event: DragEvent) {
  const raw = event.dataTransfer?.getData('application/x-page-node');
  if (!raw) return;
  const payload = JSON.parse(raw) as DragPayload;
  emit('drop-node', { targetId: props.node.id, payload });
  isHovering.value = false;
}

function forwardDrop(payload: { targetId: string; payload: DragPayload }) {
  emit('drop-node', payload);
}

function selectNode() {
  emit('select', props.node.id);
}
</script>

<style scoped>
.container-node {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.container-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 8px;
}

.container-toolbar .select {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(37, 99, 235, 0.12);
  font-size: 0.85rem;
  cursor: pointer;
}

.container-toolbar .select.active {
  border-color: #2563eb;
  background: rgba(37, 99, 235, 0.25);
}

.hint {
  font-size: 0.75rem;
  color: #6b7280;
}

.container-body {
  min-height: 120px;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
}

.container-body.selected {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}

.empty-state {
  color: #94a3b8;
  font-size: 0.9rem;
}

.is-root .container-body {
  border-style: solid;
}
</style>
