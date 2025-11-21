"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function EmptyList() {
  const router = useRouter();

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-foreground">No Items Found</h2>

      <Button
        className="mt-4 rounded-md"
        onClick={() => router.refresh()}
      >
        Refresh Page
      </Button>
    </div>
  );
}
