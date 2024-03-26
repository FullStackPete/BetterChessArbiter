import { useEffect, useState } from "react";

type ImageType = {
  src: string;
  className: string;
  alt?: string;
  isShown: boolean;
  animation: boolean;
};

function Image({ src, className, alt, isShown, animation }: ImageType) {
  return (
    <img
      src={src}
      alt=""
      className={`shadow-2xl absolute w-3/4 mt-10 rounded-xl transition-transform ${className} 
      ${isShown ? "translate-x-1 z-10 " : " blur-sm rotate-12 -translate-y-15"}
      ${animation ? "-translate-x-28" : ""}
      `}
    />
  );
}

type ImageGalleryType = {
  images: {
    url: string;
    alt: string;
  }[];
};

function ImageGallery({ images }: ImageGalleryType) {
  const [shown, setShown] = useState<boolean[]>([
    true,
    ...images.slice(1).map(() => false),
  ]);
  const [animation, setAnimation] = useState<boolean[]>([
    true,
    ...images.slice(1).map(() => false),
  ]);

  useEffect(() => {
    const ShowCard = () =>
      setTimeout(() => {
        setShown((prevShown) => {
          // Przesuwamy ostatnią wartość na początek, aby obrazy się przesuwały
          const updatedShown = [
            prevShown[prevShown.length - 1],
            ...prevShown.slice(0, prevShown.length - 1),
          ];
          return updatedShown;
        });
      }, 450);

    const intervalId = setInterval(() => {
      setAnimation((prevAnim) => {
        const updatedAnim = [
          prevAnim[prevAnim.length - 1],
          ...prevAnim.slice(0, prevAnim.length - 1),
        ];
        return updatedAnim;
      });

      ShowCard();
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-[30vh] flex justify-center">
      {images &&
        images.map((image, index) => (
          <Image
            alt={image.alt}
            key={index}
            src={image.url}
            className={""}
            isShown={shown[index]}
            animation={animation[index]}
          />
        ))}
    </div>
  );
}

export default ImageGallery;
