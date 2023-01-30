import React, { useState } from "react";

export default function Smile({ initState }: { initState: boolean }) {
  const [isActive, setIsActive] = useState(initState);

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsActive(!isActive)}
      className="cursor noselect"
    >
      <path
        d="M20.4613 1.33398H11.5439C5.90622 1.33398 1.33594 5.90426 1.33594 11.542V20.4593C1.33594 26.097 5.90622 30.6673 11.5439 30.6673H20.4613C26.099 30.6673 30.6693 26.097 30.6693 20.4593V11.542C30.6693 5.90426 26.099 1.33398 20.4613 1.33398Z"
        fill={isActive ? "#F8DE40" : "#CCCCCC"}
      />
      <path
        d="M11.878 13.1246C11.8768 13.1757 11.8594 13.2251 11.8285 13.2658C11.7975 13.3064 11.7545 13.3363 11.7056 13.351C11.6567 13.3658 11.6044 13.3648 11.5561 13.3481C11.5078 13.3314 11.466 13.2998 11.4367 13.258C11.2371 12.9576 10.979 12.7005 10.678 12.502C10.2996 12.2507 9.85553 12.1167 9.40134 12.1167C8.94715 12.1167 8.50305 12.2507 8.12468 12.502C7.82241 12.701 7.56346 12.9591 7.36334 13.2606C7.33402 13.3025 7.29224 13.334 7.24395 13.3507C7.19566 13.3674 7.14334 13.3685 7.09442 13.3537C7.04551 13.3389 7.00251 13.3091 6.97155 13.2684C6.94059 13.2278 6.92325 13.1784 6.92201 13.1273C6.91654 12.6335 7.07923 12.1525 7.38334 11.7633C7.62382 11.4584 7.93028 11.212 8.27969 11.0426C8.6291 10.8732 9.01236 10.7852 9.40067 10.7852C9.78899 10.7852 10.1723 10.8732 10.5217 11.0426C10.8711 11.212 11.1775 11.4584 11.418 11.7633C11.7203 12.1523 11.8824 12.632 11.878 13.1246Z"
        fill="#864E20"
      />
      <path
        d="M25.0811 13.1246C25.0799 13.1757 25.0626 13.2251 25.0316 13.2658C25.0006 13.3064 24.9576 13.3363 24.9087 13.351C24.8598 13.3658 24.8075 13.3648 24.7592 13.3481C24.7109 13.3314 24.6691 13.2998 24.6398 13.258C24.4403 12.958 24.1828 12.701 23.8825 12.502C23.5039 12.2506 23.0596 12.1166 22.6051 12.1166C22.1507 12.1166 21.7064 12.2506 21.3278 12.502C21.0255 12.701 20.7666 12.9591 20.5665 13.2606C20.5371 13.3025 20.4954 13.334 20.4471 13.3507C20.3988 13.3674 20.3465 13.3685 20.2975 13.3537C20.2486 13.3389 20.2056 13.3091 20.1747 13.2684C20.1437 13.2278 20.1264 13.1784 20.1251 13.1273C20.1197 12.6335 20.2824 12.1525 20.5865 11.7633C20.8269 11.4584 21.1334 11.212 21.4828 11.0426C21.8322 10.8732 22.2155 10.7852 22.6038 10.7852C22.9921 10.7852 23.3754 10.8732 23.7248 11.0426C24.0742 11.212 24.3807 11.4584 24.6211 11.7633C24.9234 12.1523 25.0855 12.632 25.0811 13.1246Z"
        fill="#864E20"
      />
      <path
        d="M30.6682 18.584C28.8552 21.299 26.3923 23.5178 23.5034 25.0387C20.6145 26.5595 17.3913 27.3341 14.1268 27.292C6.7375 27.292 5.37617 25.9587 1.9375 23.92C2.65046 25.8958 3.95528 27.6037 5.67415 28.811C7.39302 30.0183 9.44233 30.6663 11.5428 30.6667H20.4602C23.1675 30.6667 25.7639 29.5912 27.6783 27.6768C29.5927 25.7624 30.6682 23.166 30.6682 20.4587V18.584Z"
        fill={isActive ? "#E7C930" : "#5E5E5E"}
      />
      <path
        d="M22.2194 16.7773H9.77671C9.68447 16.777 9.5932 16.7961 9.50883 16.8334C9.42445 16.8707 9.34887 16.9253 9.287 16.9938C9.22513 17.0622 9.17834 17.1428 9.14969 17.2305C9.12105 17.3182 9.11117 17.4109 9.12071 17.5027C9.28471 19.0693 10.2874 22.6253 15.998 22.6253C21.7087 22.6253 22.7114 19.0693 22.8754 17.5027C22.8849 17.4109 22.875 17.3182 22.8464 17.2305C22.8178 17.1428 22.771 17.0622 22.7091 16.9938C22.6472 16.9253 22.5716 16.8707 22.4873 16.8334C22.4029 16.7961 22.3116 16.777 22.2194 16.7773Z"
        fill="#864E20"
      />
      <path
        d="M16 22.6249C17.3595 22.6698 18.7107 22.3958 19.9454 21.8249C19.5753 21.2517 18.9975 20.844 18.3334 20.6876C16.5414 20.2876 16 20.833 16 20.833C16 20.833 15.4587 20.2916 13.6667 20.6876C13.0025 20.844 12.4248 21.2517 12.0547 21.8249C13.2894 22.3958 14.6405 22.6698 16 22.6249Z"
        fill="#F06880"
      />
    </svg>
  );
}
