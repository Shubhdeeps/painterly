import React, { useRef, useState } from "react";
import { Image } from "react-bootstrap";
import InputTextArea from "../inputFields/InputTextArea";
import InputTextField from "../inputFields/InputTextField";
import OutlinedButton from "../Sidebar/OutlinedButton";
import ChooseNewArtCategory from "./ChooseNewArtCategory";

export default function NewPost() {
  const [isUploaded, setIsUploaded] = useState<File | null>(null);
  const categoryRef = useRef(categories[0]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploaded(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log(categoryRef.current);
  };

  return (
    <div className="modal-bg">
      <div className="modal-container secondary-bg border-radius-14 fontPrimary d-flex flex-column gap-3">
        <span>New Art</span>
        <InputTextField icon="" placeholder="Title" />
        <InputTextArea icon="" placeholder="Description" />
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
        <div className="d-flex justify-content-end">
          <OutlinedButton title="Post" onClick={() => handleSubmit()} />
        </div>
      </div>
    </div>
  );
}

const categories = [
  "Abstract",
  "Illustration",
  "OilPainting",
  "Cryons",
  "Colorful",
  "Anime",
  "Cartoon",
];
