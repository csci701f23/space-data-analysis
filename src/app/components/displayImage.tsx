import React, { useState } from "react";
import Image from "next/image";

type displayImageProps = {
  imagePath: string;
};

const DisplayImage: React.FC<displayImageProps> = ({ imagePath }) => {
  const [showDownload, setShowDownload] = useState(false);

  const onImageLoad = () => {
    setShowDownload(true);
  };
  return (
    <div className="flex items-center">
      <Image
        src={imagePath}
        width={500}
        height={500}
        alt="Picture of the rendered image"
        onLoad={onImageLoad}
      />

      {showDownload && (
        <a href={imagePath} download={true}>
          <Image
            src="/download_logo.png"
            alt="download button"
            width={30}
            height={30}
          />
        </a>
      )}
    </div>
  );
};
export default DisplayImage;
