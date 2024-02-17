"use client";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import CreateForm from "./CreateForm";

export default function CreateNewModal() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create New Company</Button>
      <Modal
        show={openModal}
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <CreateForm setOpenModal={setOpenModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}
