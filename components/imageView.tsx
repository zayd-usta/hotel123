"use client";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
export default function ImageView({
  images,
  id,
}: {
  images: string[];
  id: string;
}) {
  const swiperRef = useRef<SwiperRef>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div className="relative w-fit flex gap-2">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={slidePrev}
        className={
          " absolute top-1/2 -translate-y-1/2 z-10 mx-4 bg-white rounded-full hover:bg-white/80 transition w-8 h-8 my-auto max-sm:hidden " +
          (isHovered ? "block" : " opacity-0")
        }
      >
        <ChevronLeft className="w-5 h-5 mx-auto" />
      </button>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={slideNext}
        className={
          " absolute top-1/2 -translate-y-1/2 right-0 z-10 mx-4 bg-white rounded-full hover:bg-white/80 transition w-8 h-8 my-auto max-sm:hidden " +
          (isHovered ? "block" : " opacity-0")
        }
      >
        <ChevronRight className="w-5 h-5 mx-auto" />
      </button>
      <div className="absolute top-2 right-2 z-10 bg-white rounded-full hover:bg-white/80 transition w-8 h-8 cursor-pointer">
        <Heart className="w-5 h-5 mx-auto mt-[6px]" />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-2 bg-black/50 p-1 rounded-full">
        {images.map((_, index) => (
          <>
            <div
              key={"image-" + index}
              className={`w-1 h-1 rounded-full transition duration-300 ${
                index === currentImage ? "bg-white" : "bg-slate-400"
              }`}
            ></div>
          </>
        ))}
      </div>
      <Swiper
        style={{ width: "250px" }}
        loop={true}
        ref={swiperRef}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentImage(swiper.realIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            key={"imageSwiper-" + index}
            className="w-full h-full rounded-xl"
          >
            <Image
              loader={() => "/hotels/" + id + image}
              width={5000}
              height={5000}
              src={image}
              alt="image"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
