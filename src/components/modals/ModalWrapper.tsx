import React from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="modal-bg">{children}</div>;
}
