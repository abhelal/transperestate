"use client";

import React from "react";
import { Modal } from "flowbite-react";

export default function UpdateModal({ openModal, setOpenModal, company }) {
  return (
    <Modal show={openModal} size="4xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body></Modal.Body>
    </Modal>
  );
}
