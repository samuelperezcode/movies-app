"use client";
import {toast} from "sonner";

import {UploadDropzone} from "@/lib/uploadthing";

interface ImageUploadProps {
  onChange: (url?: string) => void;
}

export function ImageUpload({onChange}: ImageUploadProps) {
  return (
    <UploadDropzone
      className="h-full"
      endpoint="movieCover"
      onClientUploadComplete={(res) => {
        const {url} = res[0];

        onChange(url);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
}
