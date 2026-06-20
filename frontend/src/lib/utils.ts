import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorToast(errData?: any) {
  toast.error(
    errData?.error?.message ?? "Something went wrong. Please try again.",
  );
}
