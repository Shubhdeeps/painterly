import OutlinedButton from "@/components/Sidebar/OutlinedButton";
import Art from "@/components/singleArt/Art";
import Comment from "@/components/singleArt/Comment";
import Likes from "@/components/singleArt/Likes";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import React from "react";

const art = {
  category: "Abstract",
  title: "This is an Art title",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  time: "14 hrs ago",
  src: "https://media.vanityfair.com/photos/5e8f9f875752fb00088317c4/16:9/w_1280,c_limit/The-Art-of-Making-Art-About-a-Plague.jpg",
};

export default function Page() {
  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column p-2 gap-2 ws-100 secondary-bg border-radius-14">
        <Art src={art.src} />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="text-6 fontSecondary d-flex flex-column align-items-start">
            <span className="primary-color text-14 fw-bold">{art.title}</span>
            <span>{art.time}</span>
          </div>
          <Likes />
        </div>
        <span className="text-5 fontSecondary mt-2">{art.description}</span>
        <span className="fw-bold fontSecondary text-5">
          #{art.category.toUpperCase()}
        </span>
        <hr />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <span className="text-5">Comments</span>
          <div className="d-flex flex-coloumn gap-2 flex-wrap justify-content-center">
            <OutlinedButton title="Add Comment" />
            <OutlinedButton title="Request Review" />
          </div>
        </div>
        <div className="d-flex flex-column gap-2 mb-1 pt-3">
          <Comment comment={CommentObj} />
          <Comment comment={CommentObj} />
          <Comment comment={CommentObj} />
          <Comment comment={CommentObj} />
          <Comment comment={CommentObj} />
        </div>
      </div>
      <ProfileInfo
        currentUserProfile={false}
        description={undefined}
        name="Shubhdeep Singh"
        username="Shubh_deep_001"
        imageURL="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
      />
    </section>
  );
}

const CommentObj = {
  author: {
    name: "Simon Johnson",
    profileURL:
      "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
  },
  date: "14 hrs ago",
  commentText: "Wow, this looks amazing, hope you got the colors right!",
  isMentor: true,
};
