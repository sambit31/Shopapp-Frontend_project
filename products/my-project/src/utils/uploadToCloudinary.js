export const uploadToCloudinary = async (file) => {
  const cloudName = "dufzofg3k";
  const uploadPreset = "ecommerce_profile";

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // cloudinary URL
};
