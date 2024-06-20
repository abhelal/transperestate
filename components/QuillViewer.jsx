"use client";
import React, { useEffect } from "react";
import Quill from "quill";

const QuillViewer = ({ delta }) => {
  useEffect(() => {
    const quill = new Quill("#viewer", {
      readOnly: true,
      theme: "snow",
      modules: {
        toolbar: false,
      },
    });

    if (delta) quill.setContents(JSON.parse(delta));
  }, [delta]);
  return <div id="viewer" className="w-full h-full"></div>;
};

QuillViewer.displayName = "Viewer";

export default QuillViewer;
