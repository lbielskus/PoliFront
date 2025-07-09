import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

interface RichTextEditorProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onChange,
  initialValue = '',
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const contentState = ContentState.createFromText(initialValue);
    return EditorState.createWithContent(contentState);
  });

  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    onChange(state.getCurrentContent().getPlainText());
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      wrapperClassName='demo-wrapper'
      editorClassName='demo-editor'
    />
  );
};

export default RichTextEditor;
