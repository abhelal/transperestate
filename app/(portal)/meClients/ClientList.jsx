"use client";

import React, { useState } from "react";
import { LinkButton } from "@/components/ui/Link";
import Pagination from "@/components/ui/pagination";
import { Button } from "flowbite-react";
import UpdateModal from "./updateModal";
import api from "@/libs/clientApi";

export default function ClientList({ companies, totalPages }) {
  const [openModal, setOpenModal] = useState(false);
  const [company, setCompany] = useState({});

  const openUpdateModal = async (companyId) => {
    const res = await api.get(`/company/${companyId}`);
    const company = res.data.company;
    setCompany(company);
    setOpenModal(true);
  };

  return (
    <>
      <UpdateModal openModal={openModal} setOpenModal={setOpenModal} company={company} />
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-2">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-3">Adress</p>
          <p className="col-span-1">Country</p>
          <p className="col-span-2 text-center">Status</p>
          <div className="col-span-2 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {companies?.map((company, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-2">{company.companyId}</p>
              <p className="col-span-2">{company.name}</p>
              <p className="col-span-3">{company.address}</p>
              <p className="col-span-1">{company.country}</p>
              <div className="col-span-2 text-center">
                {company.archived ? (
                  <span className="text-red-500">Archived</span>
                ) : (
                  <span className="text-green-500">Active</span>
                )}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-3">
                <Button outline onClick={() => openUpdateModal(company.companyId)}>
                  Update
                </Button>
                <LinkButton href={`/companies/${company.companyId}`}>Visit</LinkButton>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t flex w-full justify-center p-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
