import type { ContainerNode, PageDocument } from './types';

const rootContainer: ContainerNode = {
  id: 'root',
  type: 'container',
  props: {
    layout: 'column',
    justify: 'flex-start',
    align: 'stretch',
    gap: 32,
    padding: '48px',
    width: '100%',
    height: 'auto',
    background: '#f8fafc'
  },
  children: [
    {
      id: 'component-hero',
      type: 'component',
      component: 'hero-banner',
      props: {
        eyebrow: 'Introducing',
        title: '通过拖拽快速搭建营销页面',
        subtitle:
          '利用可组合的容器和组件库，以所见即所得的方式搭建页面，最终由 Nuxt 进行服务端渲染以满足 SEO 需求。',
        ctaText: '开始搭建',
        ctaLink: '#get-started'
      }
    },
    {
      id: 'container-columns',
      type: 'container',
      props: {
        layout: 'row',
        justify: 'space-between',
        align: 'flex-start',
        gap: 24,
        padding: '0px',
        width: '100%',
        height: 'auto',
        background: '#f8fafc'
      },
      children: [
        {
          id: 'component-text',
          type: 'component',
          component: 'text-block',
          props: {
            content:
              '搭建端提供容器嵌套、布局控制、组件快速填充等功能，让设计和运营同学可以直接在浏览器中完成页面结构。'
          }
        },
        {
          id: 'component-features',
          type: 'component',
          component: 'feature-list',
          props: {
            features: [
              {
                title: '容器嵌套',
                description: '拖拽布局容器，自由组合页面结构。'
              },
              {
                title: '配置面板',
                description: '实时调节尺寸、对齐方式、间距等属性。'
              },
              {
                title: 'Nuxt 渲染',
                description: '将 JSON 结构映射为 SSR 页面，满足 SEO。'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'component-image',
      type: 'component',
      component: 'image-banner',
      props: {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
        alt: '团队在讨论设计稿'
      }
    }
  ]
};

export const samplePage: PageDocument = {
  id: 'landing-page',
  title: '页面搭建案例',
  description: '使用搭建系统生成的页面结构，通过 Nuxt 进行服务端渲染。',
  root: rootContainer
};
