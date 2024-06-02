"use client";

import React, { useEffect, useState } from "react";
import clientApi from "@/libs/clientApi";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./PDFViewer"), {
  ssr: false,
});

export default function ImagePDFViewer({ fileKey }) {
  const [viewUrl, setViewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const res = await clientApi.get(`/storage/url/${fileKey}`);
      const fileType = getFileType(fileKey);
      setViewUrl(res.data.url);
      setFileType(fileType);
    };
    fetchFile();
  }, [fileKey]);

  function getFileType(url) {
    const fileExtension = url.split(".").pop().toLowerCase();
    if (fileExtension === "pdf") {
      return "pdf";
    } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png" || fileExtension === "webp") {
      return "image";
    } else {
      return null;
    }
  }

  function renderContent() {
    if (fileType === "pdf") {
      return <PDFViewer url={viewUrl} />;
    } else if (fileType === "image") {
      return <img src={viewUrl} alt="Image" className="object-contain" />;
    } else {
      return <div>Preview not available for this file</div>;
    }
  }

  return <div className="relative flex w-full items-center justify-center">{renderContent()}</div>;
}
