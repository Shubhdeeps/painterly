import React from "react";

export default function OutlinedButton({ title }: { title: string }) {
  return (
    <div className="primary-color border-radius-50 share-art-button p-1 fw-boldtext-18 text-center cursor noselect">
      {title}
    </div>
  );
}
