"use client";

import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Select, Datepicker } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import ErrorMessage from "@/components/ErrorMesssage";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import moment from "moment";
import SelectProperty from "../SelectProperty";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import SelectApartment from "./SelectApartment";

export default function HomeDetails() {
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
    paymentDueOn: "",
  });

  useEffect(() => {
    if (tenant) {
      setData({
        properties: tenant?.properties,
        unit: tenant?.unit,
        leaseStartDate: tenant?.leaseStartDate,
        leaseEndDate: tenant?.leaseEndDate,
        generalRent: tenant?.generalRent,
        securityDeposit: tenant?.securityDeposit,
        lateFee: tenant?.lateFee,
        paymentDueDate: tenant?.paymentDueDate,
      });
    }
  }, [tenant]);

  useEffect(() => {
    if (data.properties.length > 0) {
      dispatch(
        fetchProperty(
          properties.find((prop) => prop._id === data.properties[0])?.propertyId ||
            data.properties[0].propertyId ||
            undefined
        )
      );
      setData({ ...data, apartment: null });
    }
  }, [data.properties]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Home Details</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <SelectProperty data={data} setData={setData} />
          </div>
          <div className="w-full md:w-1/2">
            <SelectApartment data={data} setData={setData} />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 bg-white rounded-lg">
        <p className="text-lg font-semibold">Rent Information</p>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseStartDate" value="Lease Start Date" />
            </div>
            <Datepicker
              id="leaseStartDate"
              name="leaseStartDate"
              placeholder="Select start date"
              required
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="leaseEndDate" value="Lease End Date" />
            </div>
            <Datepicker
              id="leaseEndDate"
              name="leaseEndDate"
              placeholder="Select end date"
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="generalRent" value="General Rent" />
            </div>
            <TextInput id="generalRent" type="number" placeholder="0.00" required step="0.01" />
          </div>

          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="securityDeposit" value="Security Deposit" />
            </div>
            <TextInput id="securityDeposit" type="number" placeholder="0.00" required step="0.01" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lateFee" value="Late Fee" />
            </div>
            <TextInput id="lateFee" type="number" placeholder="0.00" required step="0.01" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="paymentDueDate" value="Payment due on date" />
            </div>
            <Select id="paymentDueDate" required>
              <option value="">02</option>
              <option value="">03</option>
              <option value="">04</option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end">
        <Button type="submit">Save and Next</Button>
      </div>
    </div>
  );
}
