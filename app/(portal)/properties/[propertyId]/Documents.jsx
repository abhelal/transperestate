import React, { useState } from "react";
import { Button, Label, Select, FileInput, TextInput, Modal } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";
import Document from "./Document";

export default function TenantDocuments({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const documents = user?.tenant?.documents || [];
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [documentCategory, setDocumentCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateDocument = async () => {
    try {
      if (!name || !documentCategory || !selectedFile) {
        return;
      }
      setIsProcessing(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("documentCategory", documentCategory);
      formData.append("documentFile", selectedFile);
      formData.append("note", note);

      const response = await clientApi.post(`/tenants/create/document/${user.userId}`, formData);
      showToast(response.data.message, "success");
      setName("");
      setDocumentCategory("");
      setSelectedFile(null);
      setNote("");
      document.getElementById("documentFile").value = "";
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex w-full pb-4">
      <Modal show={openModal} size="lg" popup onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-lg font-semibold text-gray-600 p-4">Create new document</p>
        </Modal.Header>
        <Modal.Body>
          <div className="bg-light dark:bg-dark rounded-lg space-y-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Document Name" />
              </div>
              <TextInput
                type="text"
                placeholder="Enter document name"
                value={name}
                required
                shadow
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full space-y-4">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="documentCategory" value="Document Category" />
                </div>
                <Select id="documentCategory" value={documentCategory} onChange={(e) => setDocumentCategory(e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="agreement">Agreement</option>
                  <option value="id">ID</option>
                  <option value="passport">Passport</option>
                  <option value="others">Others</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="documentFile" value="Upload Document" />
                </div>
                <FileInput
                  id="documentFile"
                  name="documentFile"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                  required
                />
              </div>

              <div className="w-full">
                <div className="mb-2 block">
                  <Label
                    htmlFor="note"
                    value={
                      <div className="flex gap-2">
                        <span>Note</span> <span className="text-gray-400">{`(Optional)`}</span>
                      </div>
                    }
                  />
                </div>
                <TextInput type="text" placeholder="Enter note" required shadow onChange={(e) => setNote(e.target.value)} />
              </div>

              <div className="flex w-full justify-end">
                <Button
                  type="button"
                  disabled={!name || !documentCategory || !selectedFile}
                  onClick={handleCreateDocument}
                  isProcessing={isProcessing}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="w-full bg-light dark:bg-dark rounded-lg p-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Documents</p>
          <Button size={"sm"} onClick={() => setOpenModal(true)}>
            Create New
          </Button>
        </div>
        <div className="space-y-2">
          {documents.map((document, i) => (
            <Document document={document} key={i} userId={user.userId} />
          ))}
        </div>
      </div>
    </div>
  );
}
