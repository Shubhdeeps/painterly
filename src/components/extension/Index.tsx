import React, { useState } from "react";

export default function Extension({
  children,
  icon,
}: {
  children: any;
  icon: string;
}) {
  const [isFlexed, setFlex] = useState(false);
  return (
    <div className="d-flex flex-column align-items-end">
      <i
        className="bi bi-three-dots-vertical fontSecondary cursor"
        onClick={() => setFlex(!isFlexed)}
      />
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
