"use client";

import React from "react";
import { Modal } from "flowbite-react";
import UpdateForm from "./updateForm";

export default function UpdateModal({ openModal, setOpenModal, company }) {
  return (
    <Modal show={openModal} size="4xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <UpdateForm setOpenModal={setOpenModal} company={company} />
      </Modal.Body>
    </Modal>
  );
}
