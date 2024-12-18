import React from "react";
import CreateTicket from "./CreateTicket";
import serverApi from "@/libs/serverApi";
import ServerError from "@/components/ServerError";
import Pagination from "@/components/ui/pagination";
import UpdateTicket from "./UpdateTicket";

export default async function SupportTickets() {
  const res = await serverApi.get("/support/tickets").catch((e) => {});
  const tickets = res?.data?.tickets || [];
  const totalPages = res?.data?.totalPages || 1;

  if (!res) return <ServerError message={"Internal Server Error"} />;

  return (
    <div className="flex flex-col w-full h-full space-y-3">
      <div className="flex justify-between">
        <p className="text-xl font-semibold flex items-center gap-2">Ticket History</p>
        <CreateTicket />
      </div>
      <div className="flex flex-col w-full h-full bg-light dark:bg-dark rounded-xl overflow-y-auto">
        <div className="hidden xl:grid grid-cols-10 p-4 text-xs font-semibold uppercase border-b bg-gray-50 dark:bg-gray-700 rounded-t-xl">
          <p className="col-span-1">Ticket ID</p>
          <p className="col-span-2">Opened By</p>
          <p className="col-span-2">Title</p>
          <p className="col-span-4">Description</p>
          <p className="col-span-1 text-end pr-2">Status</p>
        </div>
        <div className="flex flex-col h-0 grow overflow-y-auto">
          {tickets.map((ticket, i) => (
            <div key={i} className="xl:grid grid-cols-10 p-3 px-4 items-center border-b text-sm">
              <p className="col-span-1">{ticket.ticketId}</p>
              <div className="col-span-2">
                <p>{ticket.openedBy?.name}</p>
                <p>{ticket.openedBy?.email}</p>
                <p>{ticket.openedBy?.contactNumber}</p>

                <p className="mt-2 text-gray-500 text-sm">{ticket.client?.companyName}</p>
              </div>
              <p className="col-span-2">{ticket.title}</p>
              <p className="col-span-4">{ticket.description}</p>
              <div className="col-span-1 flex justify-end">
                <UpdateTicket ticket={ticket} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center p-2 border-t">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
