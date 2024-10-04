import React from "react";
import MyTextEditor from "@/components/texteditor/MyTextEditor";
import serverApi from "@/libs/serverApi";

export default async function RefundPolicy() {
  const name = "refund-policy";
  const res = await serverApi.get(`/content/${name}`);
  const defaultValue = JSON.parse(res.data?.delta || "{}");

  return <MyTextEditor defaultValue={defaultValue} name={name} />;
}
