import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
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
      src: "/ticktalksmall.png",
      // link: "/lbrf",
    },
    {
      title: "Gratias card",
      src: "/comicssmall.png",
      // link: "/lbrf",
    },
    // {
    //   title: "JAKP",
    //   src: "/JAKP.png",
    // },
    // {
    //   title: "Comics 3",
    //   src: "/global.png",
    // },
    // {
    //   title: "fiesta 2",
    //   src: "/year.jpg",
    // },
    {
      title: "fiesta 2",
      src: "/comms.png",
    },
    {
      title: "fiesta 2",
      src: "/gkpc.png",
    },
    // {
    //   title: "fiesta 2",
    //   src: "/app.png",
    // },
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
    <div className="embla pb-2  !h-fit" ref={emblaRef}>
      <div className="embla__container  !h-fit">
        {carousels.map((image, index) => (
          <Link
            href={image.link ? image.link : ""}
            key={index}
            className="embla__slide h-fit "
          >
            <img
              src={image.src}
              alt={image.title}
              width={1500}
              height={1500}
              className="embla__slide__img md:h-[230px] rounded-xl !object-cover object-top  w-full mx-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
