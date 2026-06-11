import { Box, CircularProgress } from "@mui/material";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";

interface Url {
  src?: any;
  borderRadius?: any;
  fit?: any;
}

const ImageHandler: React.FC<Url> = ({ src, borderRadius, fit }) => {
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loadingOccurred, setLoadingOccurred] = useState(true);
  // const [src, setSrc] = useState("");

  // useEffect(() => {
  //   setSrc(`${src}`);
  // });

  const handleImageError = () => {
    setErrorOccurred(true);
    setLoadingOccurred(false);
    // setSrc(`${url}`);
  };

  const handleImageLoading = () => {
    setLoadingOccurred(false);
    // setSrc(`${url}`);
  };
  return (
    <>
      {loadingOccurred && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {
        // errorOccurred ? (
        //   <Box
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //     }}
        //   >
        //     <Typography sx={{ color: "red" }}>Image Error</Typography>
        //     <Image
        //       width={70}
        //       height={70}
        //       src={logo}
        //       alt="Fallback"
        //       onLoad={handleImageLoading}
        //     />
        //   </Box>
        // ) :
        <Image
          style={
            !borderRadius
              ? { borderRadius: "10px" }
              : { borderRadius: borderRadius }
          }
          src={
            src
              ? `${process.env.NEXT_PUBLIC_FILE}/${src}`
              : "/images/users/1.jpg"
          }
          alt="Error"
          width={500} // Adjust width according to your container size
          height={500} // Adjust height according to your container size
          objectFit={!fit ? "cover" : "contain"} // Maintain aspect ratio and cover container
          quality={100}
          onError={handleImageError}
          onLoadingComplete={handleImageLoading}
        />
      }
    </>
  );
};

export default ImageHandler;
