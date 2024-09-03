"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { PencilIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { validateSubscriptionPlan } from "@/validator/subscriptionPlan";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function UpdatePlan({ plan }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [deActivating, setDeActivating] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const [data, setData] = useState(plan);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitData = async () => {
    setIsProcessing(true);
    if (validateSubscriptionPlan(data, setErrors)) {
      try {
        const res = await clientApi.put(`/subscription/plan/${plan.planId}`, data);
        if (res.data.success) {
          router.refresh();
          showToast(res.data.message, "success");
          closeModal();
        }
      } catch (error) {
        console.log(error);
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  const deactivePlan = async () => {
    setDeActivating(true);
    try {
      const res = await clientApi.put(`/subscription/plan/deactivate/${plan.planId}`);
      if (res.data.success) {
        router.refresh();
        showToast(res.data.message, "success");
        closeModal();
      }
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "error");
    }
    setDeActivating(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setErrors({});
    setData(plan);
  };

  useEffect(() => {
    setData(plan);
  }, [plan]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        <PencilIcon className="w-5 h-5" />
      </button>

      <Modal show={isOpen} onClose={closeModal}>
        <Modal.Header>Update subscription plan</Modal.Header>
        <div className="flex flex-col h-full rounded-lg overflow-hidden">
          <Modal.Body className="flex flex-col grow h-0 overflow-y-auto">
            <div className="mt-4 flex items-start gap-2 w-full">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput value={data.name} onChange={handleChange} id="name" name="name" type="text" placeholder="Basic" />
                <ErrorMessage message={errors.name} />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput value={data.price} onChange={handleChange} id="price" name="price" type="text" placeholder="1000" addon="$" />
                <ErrorMessage message={errors.price} />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="duration" value="Duration" />
                </div>
                <TextInput
                  value={data.duration}
                  onChange={handleChange}
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="6"
                  addon="Month"
                />
                <ErrorMessage message={errors.duration} />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <TextInput
                value={data.description}
                onChange={handleChange}
                id="description"
                name="description"
                type="text"
                placeholder="Description"
              />
              <ErrorMessage message={errors.description} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="features" value="Features" />
              </div>
              {data.features.map((feature, index) => (
                <div key={index} className="mb-2 flex w-full items-center gap-2">
                  <TextInput
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...data.features];
                      newFeatures[index] = e.target.value;
                      setData((prev) => ({ ...prev, features: newFeatures }));
                    }}
                    id={`feature-${index}`}
                    name={`feature-${index}`}
                    type="text"
                    placeholder="Feature"
                    className="w-full"
                  />

                  {index === data.features.length - 1 && (
                    <Button
                      onClick={() => {
                        setData((prev) => ({ ...prev, features: [...prev.features, ""] }));
                      }}
                    >
                      +
                    </Button>
                  )}

                  {index !== data.features.length - 1 && (
                    <Button
                      onClick={() => {
                        const newFeatures = [...data.features];
                        newFeatures.splice(index, 1);
                        setData((prev) => ({ ...prev, features: newFeatures }));
                      }}
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              <ErrorMessage message={errors.features} />
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer className="flex justify-between">
          <Button color={plan.status === "active" ? "failure" : "success"} isProcessing={deActivating} onClick={deactivePlan}>
            {plan.status === "active" ? "Deactivate" : "Activate"}
          </Button>
          <div className=" flex items-center gap-3">
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
            <Button isProcessing={isProcessing} onClick={() => submitData()}>
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
