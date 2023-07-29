import { postNewArt } from "@/services/firestore/post/posts";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import InputTextArea from "../inputFields/InputTextArea";
import InputTextField from "../inputFields/InputTextField";

import OutlinedButton from "../Sidebar/OutlinedButton";
import ChooseNewArtCategory from "./ChooseNewArtCategory";
import ModalWrapper from "./ModalWrapper";
import InputFileUploader from "@/components/inputFields/InputFileUploader";

export default function NewPost({
  isOpen,
  setOpen,
  callbackForTimeline,
}: {
  isOpen: boolean;
  setOpen: Function;
  callbackForTimeline?: (image: File) => void;
}) {
  const [isUploaded, setIsUploaded] = useState<File | null>(null);
  const [alert, setAlert] = useState("");
  const categoryRef = useRef([]);
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.addEventListener("paste", (e) => {
      if (e.clipboardData) setIsUploaded(e.clipboardData?.files[0]);
    });

    return () => {
      document.removeEventListener("paste", () => {
        return;
      });
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploaded(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!titleRef.current) {
      setAlert("Title required!");
      setIsLoading(false);
      return;
    }
    if (!isUploaded) {
      setAlert("Image required!");
      setIsLoading(false);
      return;
    }

    if (!categoryRef.current.length && !callbackForTimeline) {
      setAlert("Select a category");
      setIsLoading(false);
      return;
    }

    if (!isUploaded.name.match(/\.(jpg|jpeg|png)$/)) {
      console.log(isUploaded.name);
      setAlert("Select valid image format! (jpg, jpeg, png)");
      setIsLoading(false);
      return;
    }

    if (!callbackForTimeline) {
      setAlert("");
      const res = await postNewArt(
        titleRef.current,
        isUploaded,
        descriptionRef.current,
        categoryRef.current
      );
    } else {
      callbackForTimeline(isUploaded);
    }
    setIsLoading(false);
    handleCloseModal();
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
        <span>New Art</span>
        <InputTextField icon="" placeholder="Title" textRef={titleRef} />
        <InputTextArea
          icon=""
          placeholder="Description"
          textRef={descriptionRef}
        />
        <div className="d-flex justify-content-center">
          {isUploaded && (
            <Image
              className="image-container border-radius-14"
              src={URL.createObjectURL(isUploaded)}
              alt="art"
            />
          )}
        </div>
        <InputFileUploader
          handleImageUpload={handleImageUpload}
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
        />
        {!callbackForTimeline && (
          <ChooseNewArtCategory
            categories={categories}
            categoryRef={categoryRef}
          />
        )}
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
