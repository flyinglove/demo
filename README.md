# 页面搭建与渲染示例

该仓库提供了一个基于 Vue 3 的页面搭建工具与一个 Nuxt 3 渲染端示例：

- `packages/builder`：使用 Vite + Vue 3 实现的可视化搭建界面，支持拖拽容器、配置布局、投放预设组件并导出页面结构 JSON。
- `packages/renderer`：使用 Nuxt 3 实现的服务端渲染应用，根据导出的 JSON 结构渲染页面，满足 SEO 需求。

## 快速开始

### 搭建端（Vue 3 + Vite）

```bash
cd packages/builder
pnpm install
pnpm dev
```

在浏览器打开 `http://localhost:5173` 即可开始拖拽搭建页面。

### 渲染端（Nuxt 3）

```bash
cd packages/renderer
pnpm install
pnpm dev
```

渲染端会以 Nuxt 3 的服务端渲染模式运行，可直接查看示例页面结构。将搭建端导出的 JSON 覆盖 `packages/renderer/lib/sample-page.ts` 中的 `root` 数据即可实现同构渲染。

## 目录结构

```
packages/
  builder/      # 搭建系统（Vite + Vue 3）
  renderer/     # 渲染端（Nuxt 3）
```

两端共享相同的节点结构定义（容器、组件节点），通过 JSON 描述页面树，便于在不同端之间传递与渲染。
