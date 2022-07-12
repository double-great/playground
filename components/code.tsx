/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { EditorView } from "@codemirror/view";

export default ({ value, handleChange }) => {
  const codeEditor = useRef(null);

  useEffect(() => {
    if (codeEditor.current) {
      handleChange(value);
    }
  }, [value]);

  const onChange = useCallback((value: string) => handleChange(value), []);

  return (
    <CodeMirror
      ref={codeEditor}
      value={value}
      extensions={[
        markdown({ base: markdownLanguage }),
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
      minHeight="350px"
      theme={dracula}
    />
  );
};
