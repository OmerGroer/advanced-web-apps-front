import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  FC,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface ImageInputProps {
  defaultImage: string;
  style: CSSModuleClasses;
  ref: Ref<ImageInputHandle>;
}

export interface ImageInputHandle {
  getImage: () => File | null;
}

const ImageInput: FC<ImageInputProps> = ({ defaultImage, style, ref }) => {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files && e.target.files[0]);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  useImperativeHandle(
    ref,
    (): ImageInputHandle => ({
      getImage() {
        return image;
      },
    })
  );

  return (
    <>
      <img
        src={image ? URL.createObjectURL(image) : defaultImage}
        className={style.image}
        alt="preview"
      />
      <FontAwesomeIcon
        icon={faImage}
        onClick={handleImageClick}
        className={style.imageIcon}
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        style={{ display: "none" }}
        name="image"
      />
    </>
  );
};

export default ImageInput;
