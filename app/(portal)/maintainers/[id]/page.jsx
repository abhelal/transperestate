import React from "react";
import serverApi from "@/libs/serverApi";
import UpdateMaintainer from "./UpdateMaintainer";

export default async function Maintainer({ params }) {
  const id = params?.id;
  const res = await serverApi.get(`/user/maintainers/${id}`).catch((e) => {});
  const user = res?.data?.user || {};

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Maintainer</p>
      </div>
      <UpdateMaintainer user={user} />
    </div>
  );
}
