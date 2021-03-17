import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { FormatListBulleted, FormatListNumbered } from '@styled-icons/material';
import {
  EditablePlugins,
  ExitBreakPlugin,
  HeadingPlugin,
  ImagePlugin,
  ListPlugin,
  ParagraphPlugin,
  ResetBlockTypePlugin,
  SlatePlugins,
  SoftBreakPlugin,
  TodoListPlugin,
  withImageUpload,
  withList,
} from '@udecode/slate-plugins';
import { HeadingToolbar, ToolbarList } from '@udecode/slate-plugins-components';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import {
  initialValueList,
  options,
  optionsExitBreak,
  optionsResetBlockTypes,
  optionsSoftBreak,
} from '../config/initialValues';

const id = 'Elements/List';

export default {
  title: id,
  component: ListPlugin,
  subcomponents: {
    TodoListPlugin,
  },
};

const withOverrides = [
  withReact,
  withHistory,
  withList({}, options),
  withImageUpload({}, options),
] as const;

export const Example = () => {
  const plugins: any[] = [
    ParagraphPlugin(),
    HeadingPlugin(),
    ImagePlugin(),
    SoftBreakPlugin(optionsSoftBreak),
    ExitBreakPlugin(optionsExitBreak),
  ];
  if (boolean('TodoListPlugin', true)) plugins.push(TodoListPlugin());
  if (boolean('ListPlugin', true)) plugins.push(ListPlugin());
  if (boolean('ResetBlockTypePlugin', true))
    plugins.push(ResetBlockTypePlugin(optionsResetBlockTypes));

  const createReactEditor = () => () => {
    return (
      <SlatePlugins
        id={id}
        initialValue={initialValueList}
        withOverrides={withOverrides}
      >
        <HeadingToolbar>
          <ToolbarList
            {...options}
            typeList={options.ul.type}
            icon={<FormatListBulleted />}
          />
          <ToolbarList
            {...options}
            typeList={options.ol.type}
            icon={<FormatListNumbered />}
          />
        </HeadingToolbar>
        <EditablePlugins
          plugins={plugins}
          editableProps={{
            placeholder: 'Enter some rich text...',
            spellCheck: true,
            autoFocus: true,
          }}
        />
      </SlatePlugins>
    );
  };

  const Editor = createReactEditor();

  return <Editor />;
};
