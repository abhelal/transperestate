import React from "react";
import serverApi from "@/libs/serverApi";
import UpdateJanitor from "./UpdateJanitor";
import ServerError from "@/components/ServerError";

export default async function Maintainer({ params }) {
  let errorMessages = null;
  const id = params?.id;
  const res = await serverApi.get(`/user/janitors/${id}`).catch((error) => {
    errorMessages = error?.response?.data?.message;
  });
  const user = res?.data?.user || {};

  if (errorMessages) return <ServerError message={errorMessages} />;

  return (
    <div>
      <p className="text-xl font-semibold">Janitor</p>
      <UpdateJanitor user={user} />
    </div>
  );
}
