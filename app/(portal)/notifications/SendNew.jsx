"use client";
import React, { useState } from "react";
import { Button, TextInput, Textarea, Label, Modal, Datepicker } from "flowbite-react";
import SelectProperty from "@/components/SelectProperty";
import { validateNotification } from "@/validator/notification";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function SendNewNotification() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState({
    properties: [],
    date: new Date(),
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendNotification = async () => {
    setIsProcessing(true);
    try {
      setErrors({});
      const notification = {
        ...data,
        properties: data.properties.map((property) => property._id),
      };
      if (validateNotification(notification, setErrors)) {
        const res = await clientApi.post("/notification", notification);
        showToast(res.data.message, "success");
        setShow(false);
        router.refresh();
        setData({
          properties: [],
          date: new Date(),
          title: "",
          body: "",
        });
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <Button onClick={() => setShow(true)}>Send New</Button>
      <Modal show={show} popup onClose={() => setShow(false)}>
        <Modal.Header className="p-6">
          <Label htmlFor="title" className="text-lg" value="Send New Notification" />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4 bg-white rounded-lg">
            <div className="flex justify-between">
              <div>
                <Datepicker
                  minDate={new Date()}
                  onSelectedDateChanged={(date) =>
                    setData((prevData) => ({
                      ...prevData,
                      date: date,
                    }))
                  }
                />
                <ErrorMessage message={errors.date} />
              </div>
              <div className="min-w-32">
                <SelectProperty data={data} setData={setData} />
                <ErrorMessage message={errors.properties} />
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="title" value="Title" />
              <TextInput name="title" value={data.title} onChange={handleChange} />
              <ErrorMessage message={errors.title} />
            </div>

            <div className="w-full">
              <Label htmlFor="notification" value="Notification" />
              <Textarea rows={4} value={data.body} name="body" onChange={handleChange} />
              <ErrorMessage message={errors.body} />
            </div>
            <div className="pt-4 flex justify-end">
              <Button isProcessing={isProcessing} onClick={handleSendNotification}>
                Send Now
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
