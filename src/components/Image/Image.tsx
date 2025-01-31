import { FC, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setLoaded] = useState(false);

  const onError = () => {
    toast.error("Error was occured loading the image");
  };

  const style = isLoaded
    ? {}
    : {
        height: 0,
      };

  const completeSrc = src.startsWith("http")
    ? src
    : `${import.meta.env.VITE_SERVER_URL}${src}`;

  return (
    <>
      <img
        src={completeSrc}
        alt={alt}
        className={className}
        style={style}
        onError={onError}
        onLoad={() => setLoaded(true)}
      />
      {!isLoaded && <CircularProgress />}
    </>
  );
};

export default Image;
