import React, { useState } from "react";
import { HiOutlineDownload, HiOutlineTrash } from "react-icons/hi";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import DeleteModal from "@/components/DeleteModal";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import ImagePDFViewer from "@/components/ImagePDFViewer";

export default function Document({ document, userId }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const downloadFile = async () => {
    try {
      setIsProcessing(true);
      const response = await clientApi.get(`/storage/url/${document.key}`);
      const url = response.data.url;
      setIsProcessing(false);
      window.open(url, "_blank");
    } catch (error) {
      showToast(error.response.data.message, "error");
      setIsProcessing(false);
    }
  };

  const handleDeleteDocument = async () => {
    try {
      setIsDeleting(true);
      const response = await clientApi.delete(`/tenants/delete/document/${userId}/${document.key}`);
      showToast(response.data.message, "success");
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsDeleting(false);
  };
  return (
    <div className="bg-white rounded-lg p-4 flex justify-between items-center">
      <Modal show={openPreview} size="3xl" popup onClose={() => setOpenPreview(false)}>
        <Modal.Header />
        <Modal.Body>
          <ImagePDFViewer fileKey={document.key} />
        </Modal.Body>
      </Modal>
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDeleteDocument} isDeleting={isDeleting} />
      <div>
        <p className="text-lg font-semibold">{document.name}</p>
        <p className="text-sm text-gray-400">{document.documentCategory}</p>
      </div>
      <div className="flex gap-3">
        <Button outline size={"sm"} color="gray" onClick={() => setOpenPreview(true)}>
          Preview
        </Button>
        <Button outline size={"sm"} color="gray" onClick={downloadFile} isProcessing={isProcessing}>
          <HiOutlineDownload className="w-4 h-4" />
        </Button>
        <Button outline size={"sm"} color="gray" onClick={() => setOpenModal(true)}>
          <HiOutlineTrash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
