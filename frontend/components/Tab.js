import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const ImageCarousel = () => {

  const carousels = [
    // {
    //   title: "Praise night",
    //   src: "/images/praise-night.jpeg",
    //   // link: "/lbrf",
    // },
    {
      title: "Tick Talk",
      src: "/tiktalk.png",
      // link: "/lbrf",
    },
    {
      title: "Gratias card",
      src: "/comm.png",
      // link: "/lbrf",
    },
    {
      title: "JAKP",
      src: "/JAKP.png",
    },
    {
      title: "Comics 3",
      src: "/global.png",
    },
    {
      title: "fiesta 2",
      src: "/year.jpg",
    },
    {
      title: "fiesta 2",
      src: "/comics.png",
    },
    {
      title: "fiesta 2",
      src: "/tiktalk.png",
    },
    {
      title: "fiesta 2",
      src: "/app.png",
    },
  ];
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ playOnInit: true, delay: 5000 })]
  );

  return (
    <div className="embla pt-5" ref={emblaRef}>
      <div className="embla__container  ">
        {carousels.map((image, index) => (
          <Link
            href={image.link ? image.link : ""}
            key={index}
            className="embla__slide h-fit "
          >
            <Image
              src={image.src}
              alt={image.title}
              width={1500}
              height={1500}
              className="embla__slide__img md:h-[250px] !object-cover object-top h-fit w-full mx-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
