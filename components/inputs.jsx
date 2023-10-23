import React from "react";

export function TextInput({ label = "", error = null, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      <p className="text-sm">{label}</p>
      <input
        {...props}
        className={`w-full bg-input text-sm p-2.5 px-5 rounded-md focus:outline-none caret-primary-500`}
      />
      {<div className="h-4 text-xs text-red-500">{error}</div>}
    </div>
  );
}

export function TextArea({ label = "", error = null, ...props }) {
  return (
    <div className="w-full space-y-1.5">
      <div className="text-sm">{label}</div>
      <textarea
        {...props}
        className={`w-full bg-input text-sm p-2.5 px-5 rounded-md focus:outline-none caret-primary-500`}
      />
      {<div className="h-4 text-xs text-red-500">{error}</div>}
    </div>
  );
}

export function CheckBox({ checked = false, updating = false, ...props }) {
  return (
    <button
      {...props}
      className={`border w-5 h-5 rounded-md p-0.5 ${updating ? "animate-ping" : ""} ${
        checked ? "text-green-500 border-green-400" : "text-transparent border-gray-400"
      } duration-300`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4.5}
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </button>
  );
}
