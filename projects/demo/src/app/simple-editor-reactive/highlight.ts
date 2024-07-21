// highlight-node.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { DOMOutputSpec, Node as NodeModel } from '@tiptap/pm/model';
import { createSelectionPlugin } from './selection-plugin';

export interface HighlightNodeAttrs {
  content: string | null;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Toggle an ordered list
       * @example editor.commands.toggleOrderedList()
       */
      insertHighlight: (content: string) => ReturnType;
    };
  }
}
const HighlightNode = Node.create<HighlightNodeAttrs>({
  name: 'highlight',

  group: 'inline',

  inline: true,

  atom: true,

  addAttributes() {
    return {
      content: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span.highlighted-content',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const html: DOMOutputSpec = ['span', mergeAttributes({ class: 'highlighted-content' }, HTMLAttributes), node.attrs['content']];
    return html;
  },

  addProseMirrorPlugins() {
    const selectionCallback = (node: NodeModel) => {
      console.log('Node selected:', node.attrs['content']);
    };

    return [
      createSelectionPlugin(selectionCallback),
    ];
  },

  addCommands() {
    return {
      insertHighlight:
        (content: string) => ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { content },
            })
            .run();
        },
    };
  },
});

export default HighlightNode;
