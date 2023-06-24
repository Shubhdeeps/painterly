import { postNewArt } from "@/services/firestore/posts";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import InputTextArea from "../inputFields/InputTextArea";
import InputTextField from "../inputFields/InputTextField";

import OutlinedButton from "../Sidebar/OutlinedButton";
import ChooseNewArtCategory from "./ChooseNewArtCategory";
import ModalWrapper from "./ModalWrapper";

export default function NewPost({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Function;
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

    if (!categoryRef.current.length) {
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

    setAlert("");
    const res = await postNewArt(
      titleRef.current,
      isUploaded,
      descriptionRef.current,
      categoryRef.current
    );
    console.log(res);
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
              <span>Choose an art</span>
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
        </div>
        <ChooseNewArtCategory
          categories={categories}
          categoryRef={categoryRef}
        />
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
