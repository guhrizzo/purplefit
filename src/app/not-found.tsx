import type { Metadata } from "next";
import { NotFoundScene } from "@/components/sections/NotFoundScene";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundScene />;
}
