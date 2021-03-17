import React from 'react';
import {
  EditablePlugins,
  HeadingPlugin,
  ParagraphPlugin,
  SlatePlugins,
} from '@udecode/slate-plugins';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { initialValueHugeDocument } from '../config/initialValues';

const id = 'Examples/Huge Document';

export default {
  title: id,
};

export const Example = () => {
  const plugins = [ParagraphPlugin(), HeadingPlugin()];

  const withOverrides = [withReact, withHistory] as const;

  return (
    <SlatePlugins
      id={id}
      initialValue={initialValueHugeDocument}
      withOverrides={withOverrides}
    >
      <EditablePlugins
        plugins={plugins}
        editableProps={{
          placeholder: 'Enter some text...',
          spellCheck: true,
          autoFocus: true,
        }}
      />
    </SlatePlugins>
  );
};
