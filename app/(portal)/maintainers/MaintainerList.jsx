"use client";

import React, { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Link";
import Pagination from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/LoadingSkeletons";
import { Button } from "flowbite-react";
// import UpdateModal from "./updateModal";
import api from "@/libs/clientApi";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { fetchMaintainers } from "@/libs/features/maintainer/maintainerAction";

export default function MaintainerList({ searchParams }) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  const dispatch = useAppDispatch();
  const { maintainers, totalPages, loading } = useAppSelector((state) => state.maintainer);
  const [openModal, setOpenModal] = useState(false);
  const [maintainer, setCompany] = useState({});

  const openUpdateModal = async (companyId) => {
    const res = await api.get(`/maintainer/${companyId}`);
    const maintainer = res.data.maintainer;
    setCompany(maintainer);
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(fetchMaintainers({ query, page }));
  }, [query, page]);

  return (
    <>
      {/* <UpdateModal openModal={openModal} setOpenModal={setOpenModal} maintainer={maintainer} /> */}
      <div className="flex flex-col w-full h-full bg-white rounded-xl">
        <div className="grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 rounded-t-xl">
          <p className="col-span-1">id</p>
          <p className="col-span-2">Name</p>
          <p className="col-span-2">Email</p>
          <p className="col-span-2">Contact</p>
          <p className="col-span-3">Properties</p>
          <p className="col-span-1 text-center">Status</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {loading && maintainers.length === 0 && <TableSkeleton />}
          {maintainers?.map((maintainer, index) => (
            <div key={index} className="grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-1">{maintainer.userId}</p>
              <p className="col-span-2">{maintainer.name}</p>
              <p className="col-span-2">{maintainer.email}</p>
              <p className="col-span-2">{maintainer.contactNumber}</p>
              <p className="col-span-3">{maintainer.properties}</p>
              <div className="col-span-1 text-center">
                {maintainer.status === "ACTIVE" ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">{maintainer.status}</span>
                )}
              </div>
              <div className="col-span-1">
                <Button outline onClick={() => openUpdateModal(maintainer.companyId)}>
                  Update
                </Button>
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
