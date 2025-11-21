import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ classNames }: { classNames?: string }) {
  return (
    <Link href={"/"} className={cn("ml-[-6px] h-8 w-auto md:h-14", classNames)}>
      <Image
        src={"/logo.png"}
        alt="Task Manager"
        width={400}
        height={160}
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
