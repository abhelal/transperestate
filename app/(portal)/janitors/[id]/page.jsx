import React from "react";
import serverApi from "@/libs/serverApi";
import UpdateJanitor from "./UpdateJanitor";

export default async function Maintainer({ params }) {
  const id = params?.id;
  const res = await serverApi.get(`/user/janitors/${id}`).catch((e) => {});
  const user = res?.data?.user || {};

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Janitor</p>
      </div>
      <UpdateJanitor user={user} />
    </div>
  );
}
