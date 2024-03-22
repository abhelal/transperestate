import React, { useState } from "react";
import { Button, Label, Select, FileInput } from "flowbite-react";

export default function UploadDocumentForm() {
  const [tenantName, setTenantName] = useState("");
  const [documentCategory, setDocumentCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., API call or state update)
    console.log("Form submitted:", {
      tenantName,
      documentCategory,
      selectedFile,
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center p-4 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Document Details</p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="documentCategory" value="Document Category" />
            </div>
            <Select
              id="documentCategory"
              value={documentCategory}
              onChange={(e) => setDocumentCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="agreement">Agreement</option>
              <option value="id">ID</option>
              <option value="passport">Passport</option>
              <option value="others">Others</option>
            </Select>
          </div>

          <div className="w-full md:w-1/2">
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
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">Save and Create</Button>
      </div>
    </form>
  );
}
