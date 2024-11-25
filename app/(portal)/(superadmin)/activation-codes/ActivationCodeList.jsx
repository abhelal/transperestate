"use client";

import React from "react";
import Pagination from "@/components/ui/pagination";
import moment from "moment";
import { ClipboardDocumentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";
import { useRouter } from "next/navigation";

export default function ActivationCodeList({ coupons, totalPages }) {
  const router = useRouter();
  const { showToast } = useToast();

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast("Code copied to clipboard", "success");
  };

  const deleteCode = async (id) => {
    try {
      const res = await clientApi.delete(`/coupons/${id}`);
      if (res.status === 200) {
        showToast(res.data.message, "success");
        router.refresh();
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl">
        <div className="hidden xl:grid grid-cols-12 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-3">Code</p>
          <p className="col-span-1">Type</p>
          <p className="col-span-3">Description</p>
          <p className="col-span-2">Expire Date</p>
          <p className="col-span-1">Used</p>
          <p className="col-span-1">Used By</p>
          <div className="col-span-1 text-center">Action</div>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto scrollboxmenu divide-y">
          {coupons?.map((coupon, index) => (
            <div key={index} className="xl:grid grid-cols-12 p-2 px-4 items-center text-sm">
              <p className="col-span-3">{coupon.code}</p>
              <p className="col-span-1">{coupon.couponType}</p>
              <p className="col-span-3">{coupon.description}</p>
              <div className="col-span-2">{moment(coupon.expirationDate).format("ll")}</div>
              <div className="col-span-1 px-4">{coupon.uses}</div>
              <div className="col-span-1">
                <button className=" text-primary-500 underline" onClick={() => router.push(`/clients/${coupon?.user?.userId}`)}>
                  {coupon?.user?.userId}
                </button>
              </div>
              <div className="col-span-1 flex items-center justify-end xl:justify-center gap-3">
                <button onClick={() => copyCode(coupon.code)}>
                  <ClipboardDocumentIcon className="h-4 w-4" />
                </button>
                <button onClick={() => deleteCode(coupon._id)}>
                  <TrashIcon className="w-4 h-4" />
                </button>
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
