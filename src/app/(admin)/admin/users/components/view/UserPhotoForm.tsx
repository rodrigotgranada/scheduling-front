import React, { useState } from "react";
import { FaPen, FaTimes, FaSave } from "react-icons/fa";

interface UserPhotoFormProps {
  currentPhoto: string;
  onSave: (file: File | null) => void;
}

const UserPhotoForm: React.FC<UserPhotoFormProps> = ({
  currentPhoto,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentPhoto || null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemovePicture = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
    onSave(selectedFile);
  };

  return (
    <div className="relative mb-4">
      <div className="relative mx-auto w-24 h-24">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=Avatar`}
            alt="Default Avatar"
            className="w-full h-full rounded-full object-cover"
          />
        )}
        <label
          htmlFor="file-input"
          className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white cursor-pointer"
        >
          <FaPen size={16} />
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {previewUrl && (
          <button
            onClick={handleRemovePicture}
            className="absolute bottom-0 left-0 bg-red-500 p-1 rounded-full text-white"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        <FaSave size={16} />
      </button>
    </div>
  );
};

export default UserPhotoForm;
