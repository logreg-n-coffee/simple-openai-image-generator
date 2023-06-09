import "./globals.css";
import { Inter } from "next/font/google";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "OpenAI Image Generator",
  description: "Generated by create next app, powered by OpenAI APIs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>{children}</body>
    </html>
  );
}
