import React from "react";
import { Button, Modal } from "flowbite-react";

export default function DeleteModal({ openModal, setOpenModal, handleDelete }) {
  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div>
          <p className="text-lg">Delete</p>
          <p className="text-sm mt-6">Are you sure! you want to delete ? This action cannot be undone.</p>
          <div className="mt-6 flex items-center justify-end gap-4">
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button color="failure" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
