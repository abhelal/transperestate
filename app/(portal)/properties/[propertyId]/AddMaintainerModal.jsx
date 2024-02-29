"use client";

import React from "react";
import { Button, Modal } from "flowbite-react";

export default function AddMaintainerModal({ openModal, setOpenModal }) {
  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div>
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Manage Maintainer</p>
          </div>
          <div className="relative"></div>
          <div className="mt-4 flex justify-between">
            <Button outline onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenModal(false)}>Save</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
