"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";

const QuillEditor = forwardRef(({ defaultValue }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));

    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ];
    const quill = new Quill(editorContainer, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });

    ref.current = quill;

    if (defaultValueRef.current) {
      quill.setContents(defaultValueRef.current);
    }

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return <div ref={containerRef} className="flex flex-col h-full"></div>;
});

QuillEditor.displayName = "Editor";

export default QuillEditor;
