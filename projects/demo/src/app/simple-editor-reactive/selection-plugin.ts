// selection-plugin.ts
import { Node } from '@tiptap/pm/model';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';

const createSelectionPlugin = (callback: (node: Node) => void) => {
  return new Plugin({
    key: new PluginKey('selectionPlugin'),
    props: {
      handleDOMEvents: {
        mousedown(view) {
          const { state, dispatch } = view;
          const { selection } = state;
          if (selection instanceof NodeSelection) {
            const tr = state.tr.setSelection(selection);
            dispatch(tr);
            callback(selection.node);
          }
          return false;
        },
      },
    },
  });
};

export { createSelectionPlugin };
