import React from "react";
import serverApi from "@/libs/serverApi";
import ServerError from "@/components/ServerError";

export default async function ServiceProvider({ params }) {
  let errorMessages = null;
  const id = params?.providerId;

  const res = await serverApi.get(`/provider/${id}`).catch((error) => {
    errorMessages = error?.response?.data?.message;
  });
  const provider = res?.data?.provider || {};

  if (errorMessages) return <ServerError message={errorMessages} />;
  return (
    <div>
      <p className="text-xl font-semibold">Provider :: {id}</p>
      {/* Add your provider details component here */}
      <div className="mt-4 card p-4">
        <div className="mt-2">
          <p>Name: {provider?.name}</p>
          <p>Contact Number: {provider?.contactNumber}</p>
          <p>Email: {provider?.email}</p>
          <p>Status: {provider?.status}</p>
        </div>
        <p className="mt-4">Services:</p>
        <div className="mt-2">
          {provider?.provider?.services?.map((service, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 p-1 mr-2">
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
