"use client";

import React, { useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import clientApi from "@/libs/clientApi";
import { validateSubscriptionPlan } from "@/validator/subscriptionPlan";

export default function AddNewPlan() {
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    features: [""],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const saveNewPlan = async () => {
    if (validateSubscriptionPlan(data, setErrors)) {
      try {
        const res = await clientApi.post("/subscription-plan", data);
        if (res.data.success) {
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setErrors({});
    setData({
      name: "",
      price: "",
      duration: "",
      description: "",
      features: [""],
    });
  };

  return (
    <div>
      <Button className="" onClick={() => setIsOpen(true)}>
        Add New
      </Button>

      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Add new subscription plan</Modal.Header>
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
        <Modal.Footer className="flex justify-end">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => saveNewPlan()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
