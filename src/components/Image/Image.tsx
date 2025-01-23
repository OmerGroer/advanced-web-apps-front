import { FC, useState } from "react";
import { CircularProgress } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setLoaded] = useState(false);

  const style = isLoaded
    ? {}
    : {
        height: 0,
      };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={() => setLoaded(true)}
      />
      {!isLoaded && <CircularProgress />}
    </>
  );
};

export default Image;
