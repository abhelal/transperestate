import { Button, Checkbox, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useAppDispatch } from "@/libs/hooks";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { useAppSelector } from "@/libs/hooks";
import { useToast } from "@/context/ToastContext";
import clientApi from "@/libs/clientApi";

const utilities = [
  "Water",
  "Electricity",
  "Gas",
  "Heating",
  "Cooling",
  "Trash Recycling",
  "Internet Cable",
  "Sewer Septic",
  "Landscaping",
  "Gardening",
  "Pest Control",
];
export default function Utilities() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { property } = useAppSelector((state) => state.property);
  const [newUtitlities, setNewUtilities] = useState(property.utilities || []);

  const updateNewUtilities = (utility) => {
    if (newUtitlities.includes(utility)) {
      setNewUtilities(newUtitlities.filter((u) => u !== utility));
    } else {
      setNewUtilities([...newUtitlities, utility]);
    }
  };

  const saveUtilities = async () => {
    try {
      const res = await clientApi.put(`/properties/${property.propertyId}/utilities`, {
        utilities: newUtitlities,
      });
      showToast(res.data.message, "success");
      dispatch(fetchProperty(property.propertyId));
      setOpenModal(false);
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    setNewUtilities(property.utilities || []);
  }, [property, openModal]);

  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
      <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
        <Modal.Header />
        <Modal.Body>
          <p className=" font-semibold pb-3">Utilities</p>
          <div className=" space-y-2">
            {utilities.map((utility, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div>
                    <IoMdCheckmarkCircleOutline />
                  </div>
                  <div>
                    <p className="text-sm">{utility}</p>
                  </div>
                </div>
                <Checkbox checked={newUtitlities.includes(utility)} onChange={() => updateNewUtilities(utility)} />
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-end gap-4">
            <Button size="sm" outline onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={saveUtilities}>
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Utilities</p>
        <button outline onClick={() => setOpenModal(true)}>
          <HiOutlinePencilSquare className="w-5 h-5" />
        </button>
      </div>
      {property?.utilities.map((utility, i) => (
        <div key={i} className="flex items-center gap-3">
          <div>
            <IoMdCheckmarkCircleOutline className={"text-primary-600"} />
          </div>
          <div>
            <p className="text-sm">{utility}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
