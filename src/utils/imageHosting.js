import { imageHostKey } from "../config/config";

export const uploadImageToImgBB = async (data) => {
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
    {
      method: "POST",
      body: data,
    }
  );

  return res.json();
};
