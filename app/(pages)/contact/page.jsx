import React from "react";
import serverApi from "@/libs/serverApi";
import TextViewer from "@/components/TextViewer";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const res = await serverApi.get("/content/contact-us");
  const delta = res.data?.delta || "";
  return (
    <div className="flex flex-col items-center">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl mt-10">
        <div>
          <p className="text-xl font-semibold p-4">Get in Touch</p>
          <TextViewer delta={delta} />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
