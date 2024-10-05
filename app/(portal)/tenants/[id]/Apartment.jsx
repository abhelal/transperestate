"use client";

import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Datepicker } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import SelectProperty from "./SelectProperty";
import SelectApartment from "./SelectApartment";
import { validateHomeDetails } from "@/validator/tenant";
import { BsCurrencyDollar } from "react-icons/bs";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import DeleteModal from "@/components/DeleteModal";

export default function ApartmentComponent({ apartment, userId }) {
  const router = useRouter();
  const [apartments, setApartments] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState({
    property: apartment?.property || null,
    apartment: apartment || null,
    leaseStartDate: apartment.leaseStartDate || moment().format("ll"),
    rent: apartment?.rent || "",
    deposit: apartment?.deposit || "",
  });

  useEffect(() => {
    const fetchAppartments = async () => {
      try {
        const res = await clientApi.get(`/properties/${data.property.propertyId}/apartments`);
        setApartments(res.data.apartments);
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    };
    if (data.property) fetchAppartments();
  }, [data.property, apartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsProcessing(true);

      let rentData = {
        propertyId: data?.property?.propertyId,
        apartmentId: data?.apartment?.apartmentId,
        leaseStartDate: data?.leaseStartDate,
        rent: data?.rent,
        deposit: data?.deposit,
      };

      if (validateHomeDetails(rentData, setErrors)) {
        const res = apartment?.tenant
          ? await clientApi.put(`/tenants/apartment/update/${userId}`, rentData)
          : await clientApi.post(`/tenants/apartment/add/${userId}`, rentData);
        router.refresh();

        showToast(res.data.message, "success");
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      if (!data.apartment.apartmentId) return;
      const res = await clientApi.delete(`/tenants/apartment/delete/${userId}/${data.apartment.apartmentId}`);
      showToast(res.data.message, "success");
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsDeleting(false);
      setOpenModal(false);
      router.refresh();
    }
  };

  return (
    <div className="mt-4 w-full flex flex-col gap-4">
      <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDelete} isDeleting={isDeleting} />
      <div className="w-full flex gap-2 bg-white p-4 rounded-lg">
        <div className="w-full">
          <SelectProperty data={data} setData={setData} disabled={data?.apartment?.property?.propertyId ? true : false} />
          <ErrorMessage message={errors.properties} />
        </div>
        <div className="w-full">
          <SelectApartment
            data={data}
            setData={setData}
            apartments={apartments}
            disabled={data?.apartment?.property?.propertyId ? true : false}
          />
          <ErrorMessage message={errors.apartment} />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="leaseStartDate" value="Lease Start Date" />
          </div>
          <Datepicker
            id="leaseStartDate"
            name="leaseStartDate"
            placeholder="Select start date"
            disabled={data?.apartment?.property?.propertyId ? true : false}
            value={data.leaseStartDate ? new Date(data.leaseStartDate) : new Date()}
            onChange={(date) => setData((prevData) => ({ ...prevData, leaseStartDate: date }))}
          />
          <ErrorMessage message={errors.leaseStartDate} />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="deposit" value="Security Deposit" />
          </div>
          <TextInput
            id="deposit"
            name="deposit"
            type="number"
            icon={BsCurrencyDollar}
            placeholder="0.00"
            value={data.deposit}
            onChange={handleChange}
            disabled={data?.apartment?.property?.propertyId ? true : false}
          />
          <ErrorMessage message={errors.deposit} />
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="rent" value="Rent per month" />
          </div>
          <TextInput
            id="rent"
            name="rent"
            type="number"
            icon={BsCurrencyDollar}
            placeholder="0.00"
            value={data.rent}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.rent} />
        </div>

        <div className="pt-1.5 min-w-40 flex justify-end items-center gap-2">
          <Button onClick={handleSave} isProcessing={isProcessing}>
            {apartment?.tenant ? "Update" : "Save"}
          </Button>
          <Button outline onClick={() => setOpenModal(true)}>
            <TrashIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
