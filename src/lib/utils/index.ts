import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: Change this to the hosted backend url
export const BACKEND_URL = "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
