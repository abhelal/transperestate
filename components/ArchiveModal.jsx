import React from "react";
import { Button, Modal } from "flowbite-react";

export default function ArchiveModal({ openModal, setOpenModal, handleArchive, isArchiving = false }) {
  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div>
          <p className="text-lg">Archive</p>
          <p className="text-sm mt-6">Are you sure! you want to archive this ?</p>
          <div className="mt-6 flex items-center justify-end gap-4">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button isProcessing={isArchiving} color="failure" onClick={handleArchive}>
              Archive
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
