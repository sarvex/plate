/** @jsx jsx */
import { act, renderHook } from '@testing-library/react-hooks';
import { jsx } from '@udecode/slate-plugins-test-utils';
import { Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { pipe } from '../../../../../../pipe/pipe';
import { useMention } from '../../../../useMention';
import { mentionables } from '../mentionables.fixture';

const input = ((
  <editor>
    <hp>
      t1 @t2
      <cursor />
    </hp>
  </editor>
) as any) as Editor;

const withOverrides = [withReact, withHistory] as const;

it('should go down then back to the first index', () => {
  const editor = pipe(input, ...withOverrides);

  const { result } = renderHook(() => useMention(mentionables));

  act(() => {
    result.current.onChangeMention(editor);
  });

  act(() => {
    result.current.onKeyDownMention(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      editor
    );
  });
  act(() => {
    result.current.onKeyDownMention(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      editor
    );
  });
  act(() => {
    result.current.onKeyDownMention(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      editor
    );
  });

  expect(result.current.index).toBe(0);
});
