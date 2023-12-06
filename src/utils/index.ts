export const extractCIDFromImage = (image: string): string => {
  const cidIndex = image.lastIndexOf("/");
  return image.substring(cidIndex + 1);
};
