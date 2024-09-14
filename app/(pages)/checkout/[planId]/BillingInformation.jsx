"use client";
import React, { useState } from "react";
import { Button, TextInput, Label } from "flowbite-react";
import { useToast } from "@/context/ToastContext";
import ErrorMessage from "@/components/ErrorMesssage";

export default function BillingInformation({ plan }) {
  const { showToast } = useToast();
  const [data, setData] = useState({
    planId: plan?.planId,
    name: "",
    companyName: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    setIsProcessing(true);
    try {
      //   const res = await serverApi.post("/subscription/activate", data);
      // make 2 seconds delay to simulate the payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("Sorry, We are in test phase , you can not pay", "success", "TC");
    } catch (error) {
      setErrors(error.response.data);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold">Billing Information</h2>
        <div className="mt-4">
          <Label>Name</Label>
          <TextInput type="text" placeholder="Mr.John" name="name" value={data.name} onChange={handleInputChange} />
          <ErrorMessage message={errors.name} />
        </div>
        <div>
          <Label>Company Name {`(Optional)`}</Label>
          <TextInput type="text" placeholder="John Doe Inc" name="companyName" value={data.companyName} onChange={handleInputChange} />
          <ErrorMessage message={errors.companyName} />
        </div>
        <div>
          <Label>Email</Label>
          <TextInput type="email" placeholder="john@email.com" name="email" value={data.email} onChange={handleInputChange} />
          <ErrorMessage message={errors.email} />
        </div>
        <div></div>
        <div>
          <p className="text-xs italic py-3">By clicking on the "Pay" button, you agree to our Terms of Service and Privacy Policy.</p>
          <Button fullSized onClick={handleFormSubmit} isProcessing={isProcessing}>
            Pay ${plan?.price}
          </Button>
        </div>
      </div>
    </div>
  );
}
