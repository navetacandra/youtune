import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTunee",
  description:
    "Enjoy ad-free music with YouTunee! Our free online music app allows you to listen to your favorite songs without interruptions. Search, play, and enjoy unlimited music!",
  openGraph: {
    title: "YouTunee",
    siteName: "YouTunee",
    type: "website",
    url: "https://youtunee.vercel.app/",
    description:
      "Enjoy ad-free music with YouTunee! Our free online music app allows you to listen to your favorite songs without interruptions. Search, play, and enjoy unlimited music!",
  },
  manifest: "/manifest.json",
  authors: [
    { name: "navetacandra", url: "https://github.com/navetacandra" },
    { name: "revoazzaro", url: "https://github.com/revoazzaro" },
    { name: "reza-121", url: "https://github.com/reza-121" },
  ],
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      sizes: "16x16",
      url: "/icons/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "57x57",
      url: "/icons/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "60x60",
      url: "/icons/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "72x72",
      url: "/icons/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "76x76",
      url: "/icons/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "114x114",
      url: "/icons/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "120x120",
      url: "/icons/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "144x144",
      url: "/icons/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "152x152",
      url: "/icons/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/icons/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/icons/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/icons/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icons/favicon-16x16.png",
    },
  ],
  other: {
    "msapplication-TileColor": "#141D22",
    "msapplication-TileImage": "/icons/ms-icon-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    theme_color: "#141D22",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex h-full w-full min-h-[100dvh] overflow-x-hidden shadow-lg z-10 bg-[#272d54]`}
      >
        <Sidebar />
        <div className='flex flex-col w-full h-full md:pl-28 pl-4 pr-4 md:pr-8 md:pt-10 pt-20 text-white'>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
