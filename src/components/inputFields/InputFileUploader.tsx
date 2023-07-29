import React from "react";

export default function InputFileUploader({
  handleImageUpload,
  isUploaded,
  setIsUploaded,
}: {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploaded?: File | null;
  setIsUploaded?: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  return (
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
      {isUploaded && setIsUploaded && (
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
  );
}
