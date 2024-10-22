"use client";
import React from "react";
import { Textarea, Button } from "flowbite-react";
import clientApi from "@/libs/clientApi";
import { useToast } from "@/context/ToastContext";

export default function FeedBack() {
  const { showToast } = useToast();
  const [feedback, setFeedback] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await clientApi.post("/feedback", { message: feedback });
      setFeedback("");
      showToast("Feedback submitted successfully", "success");
    } catch (e) {
      setError(e.message);
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full justify-center">
      <div className="mt-10 w-full max-w-3xl">
        <Textarea rows={10} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Please enter your feedback here" />
        <div className="flex justify-end mt-6">
          <Button onClick={handleSubmit} isProcessing={loading}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
