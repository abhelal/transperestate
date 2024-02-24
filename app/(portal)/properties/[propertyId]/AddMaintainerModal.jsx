"use client";

import React from "react";
import { Modal } from "flowbite-react";

export default function AddMaintainerModal({ openModal, setOpenModal }) {
  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div>
          <div>
            <p className="text-xl font-semibold">Add Maintainer</p>
          </div>

          <div>hlhlkh</div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
