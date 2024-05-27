"use client";

import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Datepicker } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import SelectProperty from "./SelectProperty";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { fetchTenant } from "@/libs/features/tenant/tenantActions";
import SelectApartment from "./SelectApartment";
import { validateHomeDetails } from "@/validator/tenant";

export default function Apartment({ user }) {
  const dispatch = useAppDispatch();
  const { tenant, loadingTenant } = useAppSelector((state) => state.tenant);
  const { properties } = useAppSelector((state) => state.property);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  const [data, setData] = useState({
    properties: [],
    apartment: null,
    leaseStartDate: "",
    leaseEndDate: "",
    rent: "",
    deposit: "",
    lateFee: "",
  });

  useEffect(() => {
    if (tenant) {
      setData({
        properties: tenant?.properties,
        apartment: tenant?.apartments[0],
        leaseStartDate: tenant?.apartments[0]?.leaseStartDate,
        leaseEndDate: tenant?.apartments[0]?.leaseEndDate,
        rent: tenant?.apartments[0]?.rent,
        deposit: tenant?.apartments[0]?.deposit,
        lateFee: tenant?.apartments[0]?.lateFee,
      });
    }
  }, [tenant]);

  useEffect(() => {
    if (data.properties.length > 0) {
      dispatch(
        fetchProperty(properties.find((prop) => prop._id === data.properties[0])?.propertyId || data.properties[0].propertyId || undefined)
      );
      //setData({ ...data, apartment: null });
    }
  }, [data.properties]);

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
      if (validateHomeDetails(data, setErrors)) {
        const res = await clientApi.put(`/tenants/${tenant.userId}/update/home`, data);
        dispatch(fetchTenant(tenant.userId));
        showToast(res.data.message, "success");
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-4 w-full flex  gap-4">
      <div className="flex gap-4 w-full bg-white p-4 rounded-lg">
        <div className="w-full md:w-1/2">
          <SelectProperty data={data} setData={setData} />
          <ErrorMessage message={errors.properties} />
        </div>
        <div className="w-full md:w-1/2">
          <SelectApartment data={data} setData={setData} />
          <ErrorMessage message={errors.apartment} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseStartDate" value="Lease Start Date" />
            </div>
            <Datepicker
              id="leaseStartDate"
              name="leaseStartDate"
              placeholder="Select start date"
              value={data.leaseStartDate ? moment(data.leaseStartDate).format("ll") : moment().format("ll")}
              onSelectedDateChanged={(date) => setData((prevData) => ({ ...prevData, leaseStartDate: date }))}
            />

            <ErrorMessage message={errors.leaseStartDate} />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseEndDate" value="Lease End Date" />
            </div>
            <Datepicker
              id="leaseEndDate"
              name="leaseEndDate"
              placeholder="Select end date"
              value={data.leaseEndDate ? moment(data.leaseEndDate).format("ll") : moment().format("ll")}
              onSelectedDateChanged={(date) => setData((prevData) => ({ ...prevData, leaseEndDate: date }))}
            />
            <ErrorMessage message={errors.leaseEndDate} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="rent" value="General Rent" />
            </div>
            <TextInput id="rent" name="rent" type="number" placeholder="0.00" value={data.rent} onChange={handleChange} />
            <ErrorMessage message={errors.rent} />
          </div>

          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="deposit" value="Security Deposit" />
            </div>
            <TextInput id="deposit" name="deposit" type="number" placeholder="0.00" value={data.deposit} onChange={handleChange} />
            <ErrorMessage message={errors.deposit} />
          </div>

          <div className="w-full md:w-1/3">
            <div className="mb-2 block">
              <Label htmlFor="lateFee" value="Late Fee" />
            </div>
            <TextInput id="lateFee" name="lateFee" type="number" placeholder="0.00" value={data.lateFee} onChange={handleChange} />
            <ErrorMessage message={errors.lateFee} />
          </div>
        </div>
      </div>
    </div>
  );
}
