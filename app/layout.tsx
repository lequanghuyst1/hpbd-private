import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TransitionWrapper from "@/components/TransitionWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import BackgroundMusic from "@/components/BackgroundMusic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyễn Thị Thu Trang - 30/12",
  description: "Chúc mừng sinh nhật Trang",
  openGraph: {
    title: "Nguyễn Thị Thu Trang - 30/12",
    description: "Chúc mừng sinh nhật Trang",
    images: [
      {
        url: "/image/image2.jpg",
        width: 1200,
        height: 630,
        alt: "Nguyễn Thị Thu Trang - 30/12",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Thị Thu Trang - 30/12",
    description: "Chúc mừng sinh nhật Trang",
    images: ["/image/image2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundMusic />
          <TransitionWrapper>{children}</TransitionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
