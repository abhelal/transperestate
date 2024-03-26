import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import AddMaintainerModal from "./AddMaintainerModal";

import { useRouter } from "next/navigation";

export default function Maintainers() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { property } = useAppSelector((state) => state.property);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <AddMaintainerModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="bg-white p-4 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold capitalize">Maintainer</p>
          <Button onClick={() => router.push("/maintainers")}>Manage</Button>
        </div>
        {property &&
          property.maintainers.map((maintainer, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="font-semibold">{maintainer.name}</p>
                <p>{maintainer.email}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
