<template>
  <div class="container-node" :class="{ 'is-root': level === 0 }">
    <div
      class="container-body"
      :class="{ selected: isSelected }"
      :style="containerStyle"
      :data-container-id="node.id"
      @dragover.stop.prevent="onDragOver"
      @dragenter.stop.prevent="onDragEnter"
      @dragleave.stop.prevent="onDragLeave"
      @drop.stop.prevent="onDrop"
      @click.stop="selectNode"
    >
      <header class="container-toolbar" v-show="showToolbar">
        <button class="select" :class="{ active: isSelected }" @click.stop="selectNode">
          {{ level === 0 ? '根容器' : '容器' }} · {{ node.id }}
        </button>
        <span class="hint">
          宽度 {{ node.props.width }} · 高度 {{ node.props.height }} · 布局 {{ node.props.layout }}
        </span>
      </header>

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
import { hoveredContainerId } from '../stores/hovered-container';

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

const dragDepth = ref(0);
const isDragHovering = ref(false);
const isSelected = computed(() => props.selectedId === props.node.id);
const isHovered = computed(() => hoveredContainerId.value === props.node.id);
const showToolbar = computed(() => isSelected.value || isDragHovering.value || isHovered.value);

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
  border: isDragHovering.value ? '2px dashed #2563eb' : '1px dashed #cbd5f5',
  borderRadius: '16px',
  transition: 'border 0.15s ease'
}));

function resolveTargetId(event: DragEvent): string {
  const path = (typeof event.composedPath === 'function' ? event.composedPath() : []) as EventTarget[];
  for (const element of path) {
    if (element instanceof HTMLElement && element.dataset.containerId) {
      return element.dataset.containerId;
    }
  }
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.containerId) {
    return target.dataset.containerId;
  }
  const currentTarget = event.currentTarget;
  if (currentTarget instanceof HTMLElement && currentTarget.dataset.containerId) {
    return currentTarget.dataset.containerId;
  }
  return props.node.id;
}

function onDragOver(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy';
  }
}

function onDragEnter(event: DragEvent) {
  if (resolveTargetId(event) !== props.node.id) return;
  dragDepth.value += 1;
  isDragHovering.value = true;
}

function onDragLeave(event: DragEvent) {
  if (resolveTargetId(event) !== props.node.id) {
    dragDepth.value = 0;
    isDragHovering.value = false;
    return;
  }
  dragDepth.value = Math.max(0, dragDepth.value - 1);
  if (dragDepth.value === 0) {
    isDragHovering.value = false;
  }
}

function onDrop(event: DragEvent) {
  const raw = event.dataTransfer?.getData('application/x-page-node');
  if (!raw) return;
  const payload = JSON.parse(raw) as DragPayload;
  const targetId = resolveTargetId(event);
  if (targetId !== props.node.id) {
    dragDepth.value = 0;
    isDragHovering.value = false;
    return;
  }
  emit('drop-node', { targetId, payload });
  dragDepth.value = 0;
  isDragHovering.value = false;
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
  margin-bottom: 16px;
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

.container-toolbar {
  position: absolute;
  inset: 12px 12px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.85);
  color: white;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
}

.container-toolbar .select {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: rgba(96, 165, 250, 0.2);
  font-size: 0.85rem;
  cursor: pointer;
  color: inherit;
  pointer-events: auto;
}

.container-toolbar .select.active {
  border-color: rgba(96, 165, 250, 0.65);
  background: rgba(37, 99, 235, 0.35);
}

.hint {
  font-size: 0.75rem;
  color: rgba(226, 232, 240, 0.85);
}
</style>
