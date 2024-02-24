import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import AddMaintainerModal from "./AddMaintainerModal";

export default function Maintainer() {
  const dispatch = useAppDispatch();
  const { property } = useAppSelector((state) => state.property);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <AddMaintainerModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="bg-white p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Maintainer</p>
          <Button onClick={() => setOpenModal(true)}>Add Maintainer</Button>
        </div>
        {property &&
          property.maintainer.map((maintainer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={maintainer.image}
                  alt={maintainer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{maintainer.name}</p>
                  <p className="text-xs text-gray-500">{maintainer.role}</p>
                </div>
              </div>
              <button className="text-blue-600">
                <HiOutlinePencilSquare />
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
