import { getLeafDeserializer } from '@udecode/slate-plugins-common';
import {
  DeserializeHtml,
  useEditorPluginOptions,
} from '@udecode/slate-plugins-core';
import { MARK_STRIKETHROUGH } from './defaults';

export const useDeserializeStrikethrough = (): DeserializeHtml => {
  const options = useEditorPluginOptions(MARK_STRIKETHROUGH);

  return {
    leaf: getLeafDeserializer({
      type: options.type,
      rules: [
        { nodeNames: ['S', 'DEL', 'STRIKE'] },
        {
          style: {
            textDecoration: 'line-through',
          },
        },
      ],
      ...options.deserialize,
    }),
  };
};
