import React, { useEffect } from "react";

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const sideBar = document.getElementsByClassName("sidebar");
    sideBar[0].classList.add("hide-sidebar");
    return () => {
      sideBar[0].classList.remove("hide-sidebar");
    };
  }, []);
  return <div className="modal-bg">{children}</div>;
}
