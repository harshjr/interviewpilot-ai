"use client";

import { clsx } from "clsx";

interface Props {
  className?: string;
}

export function cn(...classes: (string | undefined | false | null)[]) {
  return clsx(classes);
}
