"use client";
import DeleteModal from "@/components/DeleteModal";
import clientApi from "@/libs/clientApi";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";
import moment from "moment";
import { set } from "lodash";

export default function NoticeList({ notices = [] }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [noticeId, setNotificationId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());

  const eventNotices = notices.filter((notice) => notice.dateEvent);
  const otherNotices = notices.filter((notice) => !notice.dateEvent);
  const dateEventNotices = notices.filter((notice) => notice.dateEvent && moment(notice.date).isSame(selectedDate, "day"));

  const openDeleteConfirmation = (id) => {
    setNotificationId(id);
    setOpenModal(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await clientApi.delete(`/notice/${noticeId}`);
      showToast(res.data.message, "success");
      setOpenModal(false);
      setNotificationId("");
      router.refresh();
    } catch (error) {
      showToast(error.response.data.message, "error");
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    setOpenCalendar(false);
  }, [selectedDate]);

  function Notice({ notices }) {
    return (
      <>
        {notices.map((notice, index) => (
          <div
            key={index}
            className={`relative w-full rounded-md p-4 ${notice.dateEvent ? "bg-gray-200 dark:bg-gray-600" : "bg-light dark:bg-dark-bg"}`}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{notice.title}</p>
                <p className="text-xs">{new Date(notice.date).toDateString()}</p>
              </div>
              <div>
                <Button outline size={"xs"} onClick={() => openDeleteConfirmation(notice.noticeId)}>
                  Delete
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm">{notice.body}</p>
            <div className="mt-4 flex gap-2">
              {notice.properties.map((property, ind) => (
                <span key={ind} className="text-xs p-0.5 px-2 border rounded-full">
                  {property.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="h-full grid xl:grid-cols-12 gap-4">
      <div className="col-span-9">
        <div className="flex flex-col h-full rounded-lg bg-light dark:bg-dark pt-2">
          <Modal show={openCalendar} onClose={() => setOpenCalendar(false)}>
            <Modal.Header />
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} notices={eventNotices} />
          </Modal>
          <DeleteModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={handleDelete} isDeleting={isDeleting} />
          <Button onClick={() => setOpenCalendar(true)} size={"xs"} className="mx-4 xl:hidden">
            {moment(selectedDate).format("MMMM DD, YYYY")}
          </Button>
          <div className="flex flex-col h-0 grow overflow-y-auto p-4 space-y-3">
            <Notice notices={dateEventNotices} />
            <Notice notices={otherNotices} />
            {!dateEventNotices.length && !otherNotices.length && (
              <div className="flex justify-center items-center h-full">
                <p className="text-lg text-gray-500">No notices found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden xl:block col-span-3">
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} notices={eventNotices} />
      </div>
    </div>
  );
}
