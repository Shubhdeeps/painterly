import { getPostsBasedOnUid } from "@/services/firestore/post/posts";
import React, { useEffect, useRef, useState } from "react";
import InputTextArea from "../inputFields/InputTextArea";
import Avatar from "@mui/material/Avatar";
import OutlinedButton from "../Sidebar/OutlinedButton";
import ModalWrapper from "./ModalWrapper";
import { Box, Typography } from "@mui/material";
import { auth } from "@/services/firebaseConfig";
import { Post } from "@/models/Post";
import { mui_consts } from "@/styles/mui";
import { createFirstTimeline } from "@/services/firestore/requests/timeline";

export default function NewRequest({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
}) {
  const [alert, setAlert] = useState("");
  const descriptionRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [currUserPosts, setCurrUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  useEffect(() => {
    (async function getCurrUserPosts() {
      const currUserId = auth.currentUser?.uid!;
      const currUserPosts = await getPostsBasedOnUid(undefined, currUserId);
      if (currUserPosts) {
        setCurrUserPosts(currUserPosts);
      }
    })();
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!selectedPost) {
      setAlert("Please select a post first!");
      setIsLoading(false);

      return;
    }
    if (!descriptionRef.current) {
      setIsLoading(false);
      setAlert("Description required!");
      return;
    }

    createFirstTimeline(
      selectedPost.artURL,
      selectedPost.artId,
      descriptionRef.current
    );
    setIsLoading(false);
    setAlert("");
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <ModalWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="modal-container secondary-bg border-radius-14 fontPrimary d-flex flex-column gap-3"
      >
        <span>New Request</span>
        {/* <InputTextField icon="" placeholder="Title" textRef={titleRef} /> */}
        <InputTextArea
          icon=""
          placeholder="Description"
          textRef={descriptionRef}
        />
        <Box className="secondaryTransparent-b border-radius-14">
          <Typography variant="h6">Select an art</Typography>
          {/* <InputTextField
            icon=""
            placeholder="Search by title"
            textRef={titleRef}
          /> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              overflow: "auto",
            }}
          >
            {currUserPosts.map((post) => {
              return (
                <React.Fragment key={post.artId}>
                  <Avatar
                    onClick={() => setSelectedPost(post)}
                    alt={post.title}
                    src={post.artURL}
                    sx={{
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      border:
                        selectedPost?.artId === post.artId
                          ? `2px solid ${mui_consts.highlightPrimary}`
                          : "none",
                    }}
                  />
                </React.Fragment>
              );
            })}
          </Box>
        </Box>

        {/* For future if we need to add upload art feature */}
        {/* <div className="d-flex justify-content-center">
          {isUploaded && (
            <Image
              className="image-container border-radius-14"
              src={URL.createObjectURL(isUploaded)}
              alt="art"
            />
          )}
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-start">
          <span className="secondaryTransparent-bg border-radius-14">
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              className="new-file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleImageUpload(e)}
            />
            <label
              htmlFor="file-upload"
              className="input-file-label cursor  ps-5 pe-5"
            >
              <span>Upload new</span>
            </label>
          </span>
          {isUploaded && (
            <div className="d-flex align-items-center gap-3">
              <span>{isUploaded.name}</span>
              <span className="secondaryTransparent-bg p-2 border-radius-50">
                <i
                  onClick={() => setIsUploaded(null)}
                  className="bi bi-x-circle cursor"
                ></i>
              </span>
            </div>
          )}
        </div> */}

        <div className="d-flex justify-content-end gap-2">
          <OutlinedButton
            title="Cancel"
            onClick={() => handleCloseModal()}
            type={"button"}
          />
          <OutlinedButton
            title={!isLoading ? "Post" : "Element"}
            onClick={() => console.log()}
            type="submit"
          />
        </div>
        {!!alert && <span className="text-danger fs-6">{alert}</span>}
      </form>
    </ModalWrapper>
  );
}

const categories = ["Abstract", "Pencil", "Colorful", "Anime"];
