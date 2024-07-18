"use client";
import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  DotButton,
  useDotButton,
} from "@/app/ui/dashboard/carousel/CarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "@/app/ui/dashboard/carousel/carousel.module.scss";
import { ImgAndPlaceholder } from "@/utils/interfaces";
import Image from "next/image";
import classNames from "classnames";
import { useAuth } from "@/config/AuthContext";
import { getCarouselData } from "@/config/firestore/carouselFirestore";
import { EditButton } from "../../buttons/EditButton";

export interface CarouselImage {
  imageName: string;
  imageUrl: string;
  visible: boolean;
}

export interface CarouselObj {
  imageArray: CarouselImage[];
}

type PropType = {
  slides: ImgAndPlaceholder[];
  carouselData: CarouselObj;
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, carouselData, options } = props;
  const { isStaff } = useAuth();
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const [carousel, setCarousel] = useState<CarouselObj>(carouselData);

  const fetchCarousel = useCallback(async () => {
    const carouselData = await getCarouselData();
    if (carouselData) {
      setCarousel(carouselData);
    } else {
      console.log("issue getting carousel list");
    }
  }, []);

  useEffect(() => {
    fetchCarousel();
  }, [fetchCarousel]);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla__slide} key="local-image">
            <Image
              src="/images/oec5.webp" // static image
              alt="Local carousel image"
              width="1200"
              height="630"
              className={styles.carouselImage}
              priority
            />
          </div>
          {slides.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                src={image.src}
                blurDataURL={image.placeholder}
                alt="carousel image"
                width="1200"
                height="630"
                className={styles.carouselImage}
                priority
              />
            </div>
          ))}
        </div>
        {isStaff && (
          <div className={styles.buttonContainer}>
            <EditButton
              editType="carousel"
              onEdit={fetchCarousel}
              carousel={carousel}
            />
          </div>
        )}
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={classNames({
                [styles.embla__dot]: true,
                [styles.embla__dot__selected]: index === selectedIndex,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
