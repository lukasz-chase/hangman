import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[];
  setImage: Dispatch<SetStateAction<{ avatar: string; nickname: string }>>;
};

const ImageCarousel = ({ images, setImage }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setImage((prev) => ({ ...prev, avatar: images[newIndex] }));
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
    setImage((prev) => ({ ...prev, avatar: images[newIndex] }));
  };

  return (
    <div className="flexCenter gap-2 lg:gap-2">
      <div
        className="flex justify-center w-full cursor-pointer"
        onClick={prevImage}
      >
        <kbd className="kbd bg-black text-primary-content">◀︎</kbd>
      </div>

      <Image
        src={images[currentImageIndex]}
        alt="carousel-image"
        height={80}
        width={80}
      />
      <div
        className="flex justify-center w-full cursor-pointer"
        onClick={nextImage}
      >
        <kbd className="kbd bg-black text-primary-content">▶︎</kbd>
      </div>
    </div>
  );
};

export default ImageCarousel;
