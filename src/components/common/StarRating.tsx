"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import * as React from "react";

export interface StarRatingProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "size"> {
  value?: number;
  onChange?: (value: number) => void;
  maxRating?: number;
  starSize?: "sm" | "md" | "lg" | "xl"; // renamed to avoid conflict
  showValue?: boolean;
  readonly?: boolean;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

export const StarRating = React.forwardRef<HTMLInputElement, StarRatingProps>(
  (
    {
      value,
      defaultValue,
      maxRating = 5,
      starSize = "md",
      readonly = false,
      onChange,
      showValue = false,
      className,
      name,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<number>(
      Number(defaultValue) || 0,
    );
    const [hoverRating, setHoverRating] = React.useState(0);

    const currentRating = typeof value === "number" ? value : internalValue;

    const handleClick = (val: number) => {
      if (readonly) return;
      setInternalValue(val);
      onChange?.(val);
    };

    return (
      <div className={cn("flex items-center gap-1 py-2", className)}>
        <div className="flex items-center">
          {Array.from({ length: maxRating }, (_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= (hoverRating || currentRating);

            return (
              <button
                key={index}
                type="button"
                className={cn(
                  "transition-colors",
                  readonly
                    ? "cursor-default"
                    : "cursor-pointer transition-transform hover:scale-110",
                )}
                onClick={() => handleClick(starValue)}
                onMouseEnter={() => !readonly && setHoverRating(starValue)}
                onMouseLeave={() => !readonly && setHoverRating(0)}
                disabled={readonly}
              >
                <Star
                  className={cn(
                    "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground stroke-[1.5] text-base duration-200 ease-in-out outline-none",
                    sizeClasses[starSize],
                    isFilled
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-ring bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>

        {showValue && (
          <span className="text-muted-foreground ml-2 text-sm">
            {currentRating.toFixed(1)} / {maxRating}
          </span>
        )}

        {/* Hidden input for form compatibility */}
        <input
          type="hidden"
          name={name}
          value={currentRating}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

StarRating.displayName = "StarRating";
