import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ButtonProps extends React.ComponentProps<typeof Button> {}

function LinkButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "group relative flex items-center gap-2 !p-0 uppercase hover:bg-transparent",
        className,
      )}
      {...props}
      data-aos="fade-in"
      data-aos-delay={500}
      data-aos-anchor-placement="top-bottom"
    >
      {children}
      <ChevronRight className="h-4 w-4" />
      <span className="absolute bottom-0 h-[1px] w-0 origin-left bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
    </Button>
  );
}

export default LinkButton;
