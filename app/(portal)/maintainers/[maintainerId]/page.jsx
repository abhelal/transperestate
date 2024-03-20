"use client";

import React, { useEffect, useState } from "react";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import clientApi from "@/libs/clientApi";
import { Button, Label, TextInput, Table, Checkbox, ToggleSwitch } from "flowbite-react";
import ErrorMessage from "@/components/ErrorMesssage";
import AddProperty from "../AddProperty";
import { useToast } from "@/context/ToastContext";
import { validateInfo, validatePassword } from "@/validator/maintainer";
import DeleteModal from "./DeleteModal";
import { useRouter } from "next/navigation";

export default function Maintainer({ params }) {
  const router = useRouter();
  const maintainerId = params.maintainerId;
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
    contactNumber: "",
    properties: [],
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchMaintainer() {
      try {
        const res = await clientApi.get(`/maintainers/${maintainerId}`);
        const { name, email, contactNumber, properties, status } = res.data.maintainer;
        setData({ name, email, contactNumber, properties, status });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    if (maintainerId) fetchMaintainer();
  }, [maintainerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheck = (e) => {
    const { id } = e.target;
    setData((prevData) => ({
      ...prevData,
      properties: prevData.properties.filter((property) => property._id !== id),
    }));
  };

  const updateInfo = async () => {
    setIsProcessing("info");
    if (validateInfo(data, setErrors)) {
      try {
        const res = await clientApi.put(`/maintainers/${maintainerId}/update/info`, data);
        showToast(res.data.message, "success");
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  const updatePassword = async () => {
    setIsProcessing("password");
    if (validatePassword(data, setErrors)) {
      try {
        const res = await clientApi.put(`/maintainers/${maintainerId}/update/password`, data);
        showToast(res.data.message, "success");
        setData((prevData) => ({
          ...prevData,
          password: "",
        }));
      } catch (error) {
        showToast(error.response.data.message, "error");
      }
    }
    setIsProcessing(false);
  };

  const updateProperties = async () => {
    setIsProcessing("properties");
    try {
      const properties = data.properties.map((property) => property._id);
      const res = await clientApi.put(`/maintainers/${maintainerId}/update/properties`, {
        properties,
      });
      showToast(res.data.message, "success");
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsProcessing(false);
  };

  const updateStatus = async () => {
    try {
      const res = await clientApi.put(`/maintainers/${maintainerId}/update/status`, {
        status: data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      });
      showToast(res.data.message, "success");
      setData((prevData) => ({
        ...prevData,
        status: prevData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      }));
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await clientApi.delete(`/maintainers/${maintainerId}`);
      showToast(res.data.message, "success");
      setOpenModal(false);
      router.push("/maintainers");
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  if (loading) return <BodySkeleton />;
  else
    return (
      <div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Maintainer</p>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 mt-4">
            <div className="flex flex-col bg-white p-4 rounded-lg">
              <div className="items-center gap-4">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.name} />
                </div>

                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="contactNumber" value="Contact Number" />
                  </div>
                  <TextInput
                    id="contactNumber"
                    type="tel"
                    name="contactNumber"
                    value={data.contactNumber}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.contactNumber} />
                </div>
              </div>
              <div className="items-center gap-4">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage message={errors.email} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <Button isProcessing={isProcessing === "info"} onClick={updateInfo}>
                  Save
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={data.password}
                  onChange={handleChange}
                />
                <ErrorMessage message={errors.password} />
              </div>

              <div className="mt-4 flex items-center justify-end">
                <Button isProcessing={isProcessing === "password"} onClick={updatePassword}>
                  Update Password
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
              <DeleteModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleDelete={handleDelete}
              />
              <div className="mt-4 flex items-center justify-end">
                <Button color="failure" onClick={() => setOpenModal(true)}>
                  Delete Maintainer
                </Button>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Active</p>
                <ToggleSwitch checked={data.status === "ACTIVE"} onChange={updateStatus} />
              </div>
            </div>
            <div className="mt-4 flex flex-col bg-white p-4 rounded-lg">
              <Table>
                <Table.Head>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell className="p-4"></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {data.properties.length > 0 &&
                    data.properties.map((property, index) => (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {property.propertyId}
                        </Table.Cell>
                        <Table.Cell>{property.name}</Table.Cell>
                        <Table.Cell className="p-4">
                          <Checkbox
                            checked={true}
                            id={property._id}
                            name="cell-checkbox"
                            onChange={handleCheck}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table>
              <div className="mt-4 flex items-center justify-between">
                <AddProperty data={data} setData={setData} />
                <Button isProcessing={isProcessing === "properties"} onClick={updateProperties}>
                  Assign Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
