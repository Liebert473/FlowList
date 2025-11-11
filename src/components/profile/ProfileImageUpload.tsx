import { useState } from "react";
import type { DragEvent } from "react";
import { ImageSquare } from "@phosphor-icons/react";

export default function ProfileImageUpload({
  handleAvatarChange,
}: {
  handleAvatarChange: (avatar: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    handleAvatarChange(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-fl-info">Profile Image</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center h-60 border-2 border-dashed rounded-xl cursor-pointer transition ${
          isDragging
            ? "border-fl-primary bg-fl-hover"
            : "border-fl-border hover:bg-fl-hover"
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center text-center text-fl-text">
            <ImageSquare size={40} weight="light" className="mb-2 opacity-70" />
            <p className="text-sm opacity-80">Drag & Drop files here</p>
            <p className="text-sm opacity-70 mt-1">or</p>
            <label className="mt-2 px-4 py-1.5 text-sm border rounded-lg cursor-pointer border-fl-border hover:bg-fl-bg-sec transition">
              Browse
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBrowse}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
