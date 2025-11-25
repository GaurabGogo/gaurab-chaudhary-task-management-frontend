import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOverdue(endDate: string): boolean {
  const now = new Date();
  const target = new Date(endDate);

  return target.getTime() < now.getTime();
}
