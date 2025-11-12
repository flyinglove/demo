<template>
  <div class="app-shell">
    <BuilderSidebar @node-drop-intent="onSidebarDropIntent" />

    <main class="builder-canvas">
      <header class="builder-header">
        <div>
          <h1>页面搭建</h1>
          <p class="subtitle">拖拽容器和组件，组合出需要的页面结构。</p>
        </div>
        <div class="action-group">
          <button class="ghost" @click="reset">重置</button>
          <button class="primary" @click="exportSchema">导出结构</button>
        </div>
      </header>
      <CanvasView :root="root" :selected-id="selectedId" @select="selectNode" @drop-node="handleDrop" />
    </main>

    <NodeInspector
      :selected="selectedNode"
      :component-definition="selectedComponentDefinition"
      @update-container="updateContainerProps"
      @update-component="updateComponentProps"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import BuilderSidebar from './components/BuilderSidebar.vue';
import CanvasView from './components/CanvasView.vue';
import NodeInspector from './components/NodeInspector.vue';
import {
  componentDefinitionMap,
  containerDefaults,
  createComponentNode,
  createContainerNode
} from './registry';
import type { ComponentNode, ContainerNode, DragPayload, PageNode } from './types';

const root = reactive<ContainerNode>({
  id: 'root',
  type: 'container',
  props: containerDefaults(),
  children: []
});

const selectedId = ref<string>('root');

const selectedNode = computed<PageNode | undefined>(() => findNode(root, selectedId.value));
const selectedComponentDefinition = computed(() => {
  if (!selectedNode.value || selectedNode.value.type !== 'component') {
    return undefined;
  }
  return componentDefinitionMap[selectedNode.value.component];
});

function findNode(current: PageNode, targetId: string): PageNode | undefined {
  if (current.id === targetId) return current;
  if (current.type === 'container') {
    for (const child of current.children) {
      const result = findNode(child, targetId);
      if (result) return result;
    }
  }
  return undefined;
}

function handleDrop(targetId: string, payload: DragPayload) {
  const container = findNode(root, targetId);
  if (!container || container.type !== 'container') return;

  if (payload.kind === 'container') {
    container.children.push(createContainerNode());
    return;
  }

  if (payload.kind === 'component' && payload.component) {
    const definition = componentDefinitionMap[payload.component];
    if (!definition) return;
    container.children.push(createComponentNode(definition.type, deepClone(definition.defaults)));
  }
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function selectNode(nodeId: string) {
  selectedId.value = nodeId;
}

function updateContainerProps(node: ContainerNode, patch: Partial<ContainerNode['props']>) {
  Object.assign(node.props, patch);
}

function updateComponentProps(node: ComponentNode, patch: Record<string, any>) {
  Object.assign(node.props, patch);
}

function reset() {
  root.children = [];
  selectedId.value = 'root';
}

function exportSchema() {
  const schema = JSON.stringify(root, null, 2);
  navigator.clipboard
    .writeText(schema)
    .then(() => {
      alert('页面结构已复制到剪贴板');
    })
    .catch(() => {
      alert('复制失败，请手动复制控制台输出');
      console.info('Page Schema', schema);
    });
}

function onSidebarDropIntent(payload: DragPayload) {
  if (selectedNode.value?.type === 'container') {
    handleDrop(selectedNode.value.id, payload);
  }
}
</script>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  height: 100vh;
  overflow: hidden;
}

.builder-canvas {
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
}

.builder-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.subtitle {
  margin: 4px 0 0;
  color: #6b7280;
}

.action-group {
  display: flex;
  gap: 8px;
}

button {
  font: inherit;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 8px 16px;
  cursor: pointer;
}

button.ghost {
  background: transparent;
  border-color: #d1d5db;
}

button.primary {
  background: #2563eb;
  color: white;
}

@media (max-width: 1260px) {
  .app-shell {
    grid-template-columns: 280px 1fr;
    grid-template-rows: auto 320px;
    grid-template-areas:
      'sidebar canvas'
      'inspector inspector';
  }
}
</style>
