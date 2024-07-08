import { getSignedUrlAction } from "@/app/(application)/actions/image-upload.actions";
import axios from "axios";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
const onUpload = (file: File) => {
  const promise = getSignedUrlAction({
    filename: file.name,
    size: file.size,
    type: file.type,
  });
  return new Promise((resolve, reject) => {
    toast.promise(
      promise.then(async (result) => {
        const [response, error] = result;
        if (error) throw new Error(error.message);
        const { imageUrl, presignedUrl } = response;
        const img = await axios
          .put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          })
          .catch((e) => {
            console.log(e);
            throw new Error("Error uploading image. Please try again.");
          });
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
          resolve(imageUrl);
        };
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => {
          reject(e);
          return e.message;
        },
      }
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    }
    if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
