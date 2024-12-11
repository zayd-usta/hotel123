"use client";

import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const dialogSwiperRef = useRef<SwiperRef>(null);

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

  const dialogSlidePrev = () => {
    if (dialogSwiperRef.current) {
      dialogSwiperRef.current.swiper.slidePrev();
    }
  };

  const dialogSlideNext = () => {
    if (dialogSwiperRef.current) {
      dialogSwiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="relative w-fit h-40">
      <button
        onClick={slidePrev}
        className="absolute top-1/2 -translate-y-1/2 z-10 mx-4 bg-white rounded-full hover:bg-white/80 transition w-8 h-8 my-auto max-sm:hidden"
      >
        <ChevronLeft className="w-5 h-5 mx-auto" />
      </button>
      <button
        onClick={slideNext}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 mx-4 bg-white rounded-full hover:bg-white/80 transition w-8 h-8 my-auto max-sm:hidden"
      >
        <ChevronRight className="w-5 h-5 mx-auto" />
      </button>
      <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-sm px-2 py-1 rounded">
        {activeIndex + 1}/{images.length}
      </div>
      <Swiper
        style={{ width: "250px", height: "100%" }}
        ref={swiperRef}
        loop={true}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        initialSlide={activeIndex}
        className="rounded-xl"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={"imageSwiper-" + index}
            className="relative rounded-xl"
          >
            <Dialog>
              <DialogTrigger>
                <div className="relative">
                  <Image
                    loader={() => image}
                    width={250}
                    height={250}
                    src={image}
                    alt={`image-${index}`}
                    className="h-full w-full object-cover rounded-xl cursor-pointer"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="relative w-full h-[500px] max-w-3xl p-0 bg-black">
                <button
                  onClick={dialogSlidePrev}
                  className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-white/70 hover:bg-white rounded-full w-8 h-8"
                >
                  <ChevronLeft className="w-5 h-5 mx-auto" />
                </button>
                <button
                  onClick={dialogSlideNext}
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white/70 hover:bg-white rounded-full w-8 h-8"
                >
                  <ChevronRight className="w-5 h-5 mx-auto" />
                </button>
                <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-sm px-2 py-1 rounded">
                  {activeIndex + 1}/{images.length}
                </div>
                <Swiper
                  style={{ width: "100%", height: "100%" }}
                  loop={true}
                  slidesPerView={1}
                  ref={dialogSwiperRef}
                  initialSlide={activeIndex}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={"dialogImage-" + idx}>
                      <Image
                        loader={() => img}
                        width={1920}
                        height={1080}
                        src={img}
                        alt={`dialog-image-${idx}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
