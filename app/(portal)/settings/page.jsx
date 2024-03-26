"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";

const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = () => {
    // Implement logic to update the password
    console.log("Update Password Details:", {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    // Reset form fields after updating the password
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <form className="flex flex-col w-full max-w-lg gap-4 bg-white rounded-lg p-4">
      <p className="text-lg font-semibold">Update Password</p>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="currentPassword" value="Current Password" />
        </div>
        <TextInput
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="newPassword" value="New Password" />
        </div>
        <TextInput
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="confirmNewPassword" value="Confirm New Password" />
        </div>
        <TextInput
          id="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
      </div>

      <Button type="button" onClick={handleUpdatePassword}>
        Update Password
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
