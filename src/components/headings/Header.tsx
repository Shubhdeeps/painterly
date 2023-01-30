import React from "react";

export default function Header({ title }: { title: string }) {
  return <div className="text-2 fw-bold mt-3 mb-1">{title}</div>;
}
