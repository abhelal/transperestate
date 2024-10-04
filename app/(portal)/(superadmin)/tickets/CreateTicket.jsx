"use client";
import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Textarea, Popover } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { validateTicket } from "@/validator/support";
import { HiChevronDown } from "react-icons/hi2";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

export default function CreateTicket() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    user: "",
    title: "",
    description: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSearch = useDebouncedCallback(async (term) => {
    try {
      const response = await clientApi.get(`/user/profile?email=${term}`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const handleSelect = (user) => {
    setData((prevData) => ({ ...prevData, user }));
    setUsers([]);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      if (!data.user) {
        setErrors({ user: "Please select a user" });
        setIsProcessing(false);
        return;
      }
      if (validateTicket(data, setErrors)) {
        const response = await clientApi.post("/support/ticketbyadmin", data);
        showToast(response.data.message, "success");
        router.refresh();
        setOpenModal(false);
        setData({
          user: "",
          title: "",
          description: "",
        });
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    if (openModal) {
      setErrors({});
      setUsers([]);
      setData({
        title: "",
        description: "",
      });
    }
  }, [openModal]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Ticket</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-lg font-semibold">Create Ticket</p>
        </Modal.Header>
        <Modal.Body>
          <Label>Opened By</Label>
          <Popover
            placement="right"
            className="z-10"
            open={open}
            onOpenChange={setOpen}
            content={
              <div className="border rounded-md overflow-hidden">
                <div className="w-full max-w-sm flex items-center bg-white p-2 px-4 rounded-md">
                  <div>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </div>
                  <input
                    className="w-full bg-white focus:outline-none caret-primary-500 px-2 text-sm"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={"Search by Email"}
                  ></input>
                </div>
                <div className="pt-3 flex flex-col gap-2 bg-gray-100 rounded-md">
                  {users.map((user, i) => (
                    <button key={i} onClick={() => handleSelect(user)} className=" bg-white w-full text-start p-2">
                      <p className="text-sm"> {user.name}</p>
                      <p className="text-xs text-gray-400 italic"> {user.client?.companyName}</p>
                    </button>
                  ))}
                </div>
              </div>
            }
          >
            <Button>
              {data.user ? data.user.name : "Select User"}
              <HiChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </Popover>
          <ErrorMessage message={errors.user} />
          <Label>Title</Label>
          <TextInput name="title" type="text" value={data.title} onChange={handleChange} />
          <ErrorMessage message={errors.title} />
          <Label>Description</Label>
          <Textarea name="description" rows={4} value={data.description} onChange={handleChange} />
          <ErrorMessage message={errors.description} />
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-3">
          <Button outline onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isProcessing}>
            Submit Ticket
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
