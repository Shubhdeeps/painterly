import React, { useState } from "react";

export default function Heart({ initState }: { initState: boolean }) {
  const [isActive, setIsActive] = useState(initState);

  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsActive(!isActive)}
      className="cursor noselect"
    >
      <path
        d="M16.2254 3.15063L16.2079 3.16801C16.0693 3.00904 15.9263 2.85256 15.7745 2.70104C14.0416 0.971594 11.6912 -1.82227e-08 9.2405 0C6.78976 1.82227e-08 4.43941 0.971595 2.70648 2.70104C0.973549 4.43049 1.82594e-08 6.77613 0 9.22194C-1.82594e-08 11.6678 0.973549 14.0134 2.70648 15.7428C2.8583 15.8944 3.0151 16.037 3.17439 16.1754L3.15697 16.1928L16.2254 29.2346L29.2934 16.1928C31.0264 14.4633 32 12.1177 32 9.67183C32 7.22598 31.0265 4.8803 29.2936 3.1508C28.4355 2.29444 27.4168 1.61514 26.2957 1.15167C25.1746 0.688203 23.973 0.44965 22.7595 0.449634C20.3087 0.449601 17.9583 1.42118 16.2254 3.15063Z"
        fill={isActive ? "#F76363" : "#CCCCCC"}
      />
    </svg>
  );
}
