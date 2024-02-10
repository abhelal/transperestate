"use client";

import { Modal } from "flowbite-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginModal({ openModal, setOpenModal }) {
  return (
    <>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
