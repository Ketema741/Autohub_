import React, { useState } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header } from '../../../components';
import { EditorData } from '../../../data/dummy';

const Editor = () => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    const data = {
      content: content
    };

    console.log(data)
  };
  const customToolbarSettings = {
    items: ['FontName', 'FontSize','Bold', 'Italic', 'Alignments', 'Image', 'CreateLink', 'CreateTable', 'FontColor', 'BackgroundColor', 'Undo', 'Redo']
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="" title="Description" />
      <RichTextEditorComponent change={args => setContent(args.value)} toolbarSettings={customToolbarSettings}>
        <EditorData />
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar, Table]} />
      </RichTextEditorComponent>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Editor;
