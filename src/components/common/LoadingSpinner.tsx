import { Audio } from "react-loader-spinner";
import Text from "../common/Typography/Text";

const LoadingSpinner = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(19, 48, 104, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div className="flex items-center justify-center gap-3">
      <Audio color="white" height="35" width="35" />
      <Text weight="bold" className="text-white">
        Minting NFT ..
      </Text>
    </div>
  </div>
);

export default LoadingSpinner;
