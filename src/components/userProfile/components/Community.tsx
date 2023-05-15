import React, { useState } from "react";
import Member from "./Member";

export default function Community() {
  const [currentCommunity, setCurrentCommunity] = useState<
    "connections" | "followers"
  >("connections");
  return (
    <div className="w-100 secondary-bg border-radius-14 p-4">
      <div className="d-flex gap-3 noselect">
        <span
          className={
            currentCommunity === "connections" ? "" : "fontSecondary cursor"
          }
          onClick={() => setCurrentCommunity("connections")}
        >
          Connections
        </span>
        {/* CAN BE ENABLED IN FUTURE! */}
        {/* <span
          className={
            currentCommunity === "followers" ? "" : "fontSecondary cursor"
          }
          onClick={() => setCurrentCommunity("followers")}
        >
          Followers
        </span> */}
      </div>
      <div className="secondaryTransparent-bg border-radius-14 d-flex flex-wrap gap-4 p-3 mt-4">
        {users.map((user) => {
          return (
            <React.Fragment key={user.src}>
              <Member
                size="md"
                date={undefined}
                src={user.src}
                title={user.title}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const users = [
  {
    title: "Simon Kareskar",
    src: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
  },
  {
    title: "John Kareskar",
    src: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg",
  },
  {
    title: "Sara Johnson",
    src: "https://img.freepik.com/free-photo/close-up-portrait-nice-cute-adorable-smiling-charming-cheerful-girl-pointing-with-her-index-finger_176532-7923.jpg?w=1380&t=st=1674902632~exp=1674903232~hmac=c061b9aed7ae4a7c7034b60bfb258e47597d0b42d51d6a4236d2d4e11719827d",
  },
  {
    title: "Simon Kareskar",
    src: "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1674902628~exp=1674903228~hmac=9f5da6e485a743705d325359acacea38ea7be9cd5df6214a0c960f6e4c50af5c",
  },
  {
    title: "John Kareskar",
    src: "https://img.freepik.com/free-photo/pretty-woman-looks-amazement-bugged-eyes-widely-opened-eyes-being-pleasantly-shocked-recieve-present_176532-9563.jpg?w=1380&t=st=1674902864~exp=1674903464~hmac=844247fe0cb295bed5c253f24bf6d3299ee70f9c05771a4be3c794bb576f7c68",
  },
  {
    title: "Sara Johnson",
    src: "https://img.freepik.com/free-photo/portrait-young-man-with-dark-curly-hair_176532-8137.jpg?w=1380&t=st=1674902878~exp=1674903478~hmac=06d2fa98026c12a2bd34694e72cb69129c5961d574d591a8aa5acd44947dea66",
  },
];
