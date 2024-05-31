import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import clientApi from "@/libs/clientApi";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

export default function ImagePDFViewer({ fileKey }) {
  const [viewUrl, setViewUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
      return (
        <div>
          <Document file={viewUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      );
    } else if (fileType === "image") {
      return <img src={viewUrl} alt="Image" className="object-contain" />;
    } else {
      return <div>Preview not available for this file</div>;
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return <div className="relative flex w-full items-center justify-center">{renderContent()}</div>;
}
