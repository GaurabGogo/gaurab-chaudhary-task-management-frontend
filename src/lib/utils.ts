import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOverdue(endDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(endDate);
  taskDate.setHours(0, 0, 0, 0);
  return taskDate < today;
}
