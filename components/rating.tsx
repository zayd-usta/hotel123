import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Fragment } from "react";

interface RatingProps {
  rating: number;
  showLabel?: boolean;
  fullStarColor?: string; // لون النجوم الممتلئة
  halfStarColor?: string; // لون النجوم النصف ممتلئة
  emptyStarColor?: string; // لون النجوم الفارغة
  className?: string;
  [key: string]: any;
}

const Rating = ({
  rating,
  showLabel = false,
  fullStarColor = "#F8D300FF",
  halfStarColor = "#F3D37AFF",
  emptyStarColor = "rgba(255, 255, 255, 0.2)",
  className,
  ...rest
}: RatingProps) => (
  <p className={classNames(className)} {...rest}>
    <span className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = null;

        if (index <= Math.floor(rating)) {
          // نجم ممتلئ
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="w-4 h-4"
              style={{ color: fullStarColor }}
            />
          );
        } else if (index - 0.5 === rating) {
          // نصف نجم
          content = (
            <FontAwesomeIcon
              icon={faStarHalfAlt}
              className="w-4 h-4"
              style={{ color: halfStarColor }}
            />
          );
        } else {
          // نجم فارغ
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="w-4 h-4"
              style={{ color: emptyStarColor }}
            />
          );
        }

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    {showLabel && <span className="ml-2">{rating.toFixed(1)}</span>}
  </p>
);

export default Rating;
