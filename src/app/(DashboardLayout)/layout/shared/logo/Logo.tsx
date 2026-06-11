import logo from "@/utils/logo.png";
import Image from "next/legacy/image";

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="NotFound"
      width={120} // Set the desired width
      height={26} // Set the desired height
    />
  );
};

export default Logo;
