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

// Function to calculate remaining time in human-readable format
export const calculateRemainingTime = (endTime: bigint) => {
  const now = BigInt(Math.floor(Date.now() / 1000)); // Convert now to a bigint
  const remainingSeconds = endTime - now;

  if (remainingSeconds <= 0n) {
    // Use 0n to indicate a bigint literal
    return "Auction ended";
  }

  const hours = Math.floor(Number(remainingSeconds) / 3600); // Convert remainingSeconds to a number for division
  const minutes = Math.floor((Number(remainingSeconds) % 3600) / 60); // Convert remainingSeconds to a number for division
  const seconds = Number(remainingSeconds) % 60; // Convert remainingSeconds to a number for modulus

  return `${hours}h ${minutes}m ${seconds}s`;
};
