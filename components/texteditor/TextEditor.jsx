"use client";

import React, { useRef, useState } from "react";
import QuillEditor from "@/components/texteditor/QuillEditor";
import { Button } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";

const TextEditor = ({ defaultValue, name }) => {
  const quillRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsProcessing(true);
    const delta = JSON.stringify(quillRef.current.getContents());
    const htmlContent = quillRef.current.getSemanticHTML();

    try {
      await clientApi.post(`/content/${name}`, { delta, htmlContent });
      showToast("Content saved successfully", "success");
    } catch (error) {
      console.error("Error saving content", error);
      showToast(error?.response?.data?.message, "error");
    }
    setIsProcessing(false);
  };
  return (
    <div className="w-full h-full max-w-6xl pb-4">
      <QuillEditor ref={quillRef} defaultValue={defaultValue} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} isProcessing={isProcessing}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default TextEditor;
