import { Button } from "@mui/material";
import { useState } from "react";
import DetailCard from "../shared/DetailCard";
import ImageHandler from "../shared/ImageHandler";
import { ModalPopupFilesDetail } from "../shared/ModalPopup";

interface ChildProps {
  data: {
    image_url: string;
  };
}

const Attachment: React.FC<ChildProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState("");
  // const [errorOccurred, setErrorOccurred] = useState(false);

  // const handleImageError = () => {
  //   setErrorOccurred(true);
  // };

  // console.log("eventDoc", errorOccurred);

  const onViewImage = (file: string) => {
    setIsOpen(true);
    setFile(file);
  };

  const onCloseView = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* <DetailCard title="Event Documents" subTitle="Event Photo"> */}
      <Button
        onClick={() => onViewImage(data.image_url)}
        variant="contained"
        size="small"
        sx={{
          padding: 0,
          // width: "250px",
          borderRadius: "10px",
          backgroundColor: "transparent",
        }}
      >
        <ImageHandler src={data.image_url} />
      </Button>
      {/* </DetailCard> */}
      <ModalPopupFilesDetail
        open={isOpen}
        image_url={file}
        handleClose={onCloseView}
      />
    </>
  );
};

export default Attachment;
