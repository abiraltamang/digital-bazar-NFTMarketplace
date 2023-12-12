export const extractCIDFromImage = (image: string): string => {
  const cidIndex = image.lastIndexOf("/");
  return image.substring(cidIndex + 1);
};

//for shortening the wallet address
export const shortenAddress = (address: string): string => {
  if (!address) return "";
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};
