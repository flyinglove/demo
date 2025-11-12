import type { ComponentDefinition, ContainerNode, ContainerProps, PageNode } from './types';

export const containerDefaults = (): ContainerProps => ({
  layout: 'column',
  justify: 'flex-start',
  align: 'stretch',
  gap: 16,
  padding: '24px',
  width: '100%',
  height: 'auto',
  background: '#ffffff'
});

let nodeId = 0;

export const createContainerNode = (): ContainerNode => ({
  id: `container-${++nodeId}`,
  type: 'container',
  props: containerDefaults(),
  children: []
});

export const createComponentNode = (type: string, props: Record<string, any>): PageNode => ({
  id: `component-${++nodeId}`,
  type: 'component',
  component: type,
  props
});

export const componentRegistry: ComponentDefinition[] = [
  {
    type: 'hero-banner',
    label: 'Hero Banner',
    description: 'Large hero area with headline and supporting text.',
    defaults: {
      eyebrow: 'Introducing',
      title: 'Design visually rich pages',
      subtitle: 'Combine layout containers and prebuilt components to compose landing pages in minutes.',
      ctaText: 'Get Started',
      ctaLink: '#get-started'
    },
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Small label above headline' },
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Main headline' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Supporting description' },
      { key: 'ctaText', label: 'CTA Text', type: 'text', placeholder: 'Button label' },
      { key: 'ctaLink', label: 'CTA Link', type: 'text', placeholder: '#cta' }
    ]
  },
  {
    type: 'text-block',
    label: 'Text Block',
    description: 'Simple rich text block.',
    defaults: {
      content: 'This is a flexible text block. Use it to provide more context to your visitors.'
    },
    fields: [
      { key: 'content', label: 'Content', type: 'textarea', placeholder: 'Write copy for this block' }
    ]
  },
  {
    type: 'feature-list',
    label: 'Feature List',
    description: 'Horizontal list of feature cards.',
    defaults: {
      features: [
        {
          title: 'Composable layouts',
          description: 'Nest containers to build any responsive layout.'
        },
        {
          title: 'Drag & drop',
          description: 'Place components exactly where you need them.'
        },
        {
          title: 'Nuxt rendering',
          description: 'Ship SEO-friendly experiences using server rendering.'
        }
      ]
    },
    fields: []
  },
  {
    type: 'image-banner',
    label: 'Image Banner',
    description: 'Full-width image with alternative text.',
    defaults: {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Team collaborating around a table'
    },
    fields: [
      { key: 'src', label: 'Image URL', type: 'text', placeholder: 'https://...' },
      { key: 'alt', label: 'Alt text', type: 'text', placeholder: 'Describe the image' }
    ]
  }
];

export const componentDefinitionMap = Object.fromEntries(
  componentRegistry.map((definition) => [definition.type, definition])
);
