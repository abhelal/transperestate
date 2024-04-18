"use server";

import React from "react";

export default async function ClientPage({ params }) {
  return <div>ClientPage {params?.clientId}</div>;
}
