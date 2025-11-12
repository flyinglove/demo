export type NodeType = 'container' | 'component';

export interface ContainerProps {
  layout: 'row' | 'column';
  justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  align: 'stretch' | 'flex-start' | 'center' | 'flex-end';
  gap: number;
  padding: string;
  width: string;
  height: string;
  background: string;
}

export interface BaseNode {
  id: string;
  type: NodeType;
}

export interface ContainerNode extends BaseNode {
  type: 'container';
  props: ContainerProps;
  children: PageNode[];
}

export interface ComponentNode extends BaseNode {
  type: 'component';
  component: string;
  props: Record<string, any>;
}

export type PageNode = ContainerNode | ComponentNode;

export interface DragPayload {
  kind: 'container' | 'component';
  component?: string;
}

export interface ComponentFieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
  placeholder?: string;
}

export interface ComponentDefinition {
  type: string;
  label: string;
  description: string;
  defaults: Record<string, any>;
  fields: ComponentFieldDefinition[];
}
