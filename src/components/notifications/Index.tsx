import React, { useState } from "react";

export default function Extension({
  children,
  icon,
}: {
  children: any;
  icon: any;
}) {
  const [isFlexed, setFlex] = useState(false);
  return (
    <div className="d-flex flex-column align-items-end">
      <span className="cursor" onClick={() => setFlex(!isFlexed)}>
        {icon}
      </span>
      {isFlexed && (
        <div className="position-relative d-flex flex-column align-items-end">
          <div
            style={{ marginTop: "" }}
            className="secondary-bg border-radius-8 position-absolute z-1"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
