"use client";

import React, { useEffect, useState } from "react";
import { BodySkeleton } from "@/components/ui/LoadingSkeletons";
import clientApi from "@/libs/clientApi";

export default function Company({ params }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      setLoading(true);
      try {
        const res = await clientApi.get(`/company/${params.companyId}`);
        setCompany(res.data.company);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getCompany();
  }, [params.companyId]);

  if (loading) return <BodySkeleton />;
  else return <div>Company {JSON.stringify(company)}</div>;
}
