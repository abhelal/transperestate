import React from "react";
import { Button, ToggleSwitch } from "flowbite-react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import clientApi from "@/libs/clientApi";
import { fetchProperty } from "@/libs/features/property/propertyActions";
import { useToast } from "@/context/ToastContext";

export default function Documents() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { property } = useAppSelector((state) => state.property);

  const handleChange = async () => {
    try {
      await clientApi.put(`/properties/${property.propertyId}/allowpets`);
      dispatch(fetchProperty(property.propertyId));
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold capitalize">Documents</p>
        <Button>New</Button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <p>Lease Agreement</p>
          <div className="flex gap-3">
            <Button size="xs" outline>
              View
            </Button>
            <Button size="xs" outline>
              Delete
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Inventory</p>
          <div className="flex gap-3">
            <Button size="xs" outline>
              View
            </Button>
            <Button size="xs" outline>
              Delete
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>Inspection Report</p>
          <div className="flex gap-3">
            <Button size="xs" outline>
              View
            </Button>
            <Button size="xs" outline>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
