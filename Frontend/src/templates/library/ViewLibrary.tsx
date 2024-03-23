import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SettingsProps {
  children: ReactNode;
  name?: string;
}

function ViewLibrary({ children }: SettingsProps) {
  return (
    <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 className="border-b py-6 text-4xl font-semibold">Library Management</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">


        <div className="col-span-12 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">{children}</div>
      </div>
    </div>
  );
}

export default ViewLibrary;
