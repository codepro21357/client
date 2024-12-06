import { Dancing_Script, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--montserrat",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--dancingScript",
});

export const neueMetana = localFont({
  src: [
    {
      path: "../../public/fonts/neue-metana/NeueMetana-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/neue-metana/NeueMetana-Bold.otf",
      weight: "700",
    },
  ],
  variable: "--neueMetana",
});
