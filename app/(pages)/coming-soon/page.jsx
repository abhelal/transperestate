import React from "react";
import serverApi from "@/libs/serverApi";
import TextViewer from "@/components/TextViewer";

export default async function ComingSoon() {
  const res = await serverApi.get("/content/coming-soon");
  const delta = res.data?.delta || "";
  return (
    <div className="flex flex-col items-center">
      <div className="min-h-screen w-full max-w-5xl mt-10">
        <TextViewer delta={delta} />
      </div>
    </div>
  );
}
