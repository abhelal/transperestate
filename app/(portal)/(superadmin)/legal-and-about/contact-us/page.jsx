import React from "react";
import MyTextEditor from "@/components/texteditor/MyTextEditor";
import serverApi from "@/libs/serverApi";

export default async function AboutUs() {
  const name = "contact-us";
  const res = await serverApi.get(`/content/${name}`);
  const defaultValue = JSON.parse(res.data?.delta || "{}");

  return <MyTextEditor defaultValue={defaultValue} name={name} />;
}
