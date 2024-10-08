import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientProvider from "@/app/context/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import Header from "@/components/shared/header/Header";
import HeaderOne from "@/components/shared/header/headerOne";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const geistSans = localFont({
  // src: "./fonts/GeistVF.woff",
  src: "./fonts/ITCKabelStd-Ultra.otf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  // src: "./fonts/GeistMonoVF.woff",
  src: "./fonts/KABELU.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const luckiestGuy = localFont({
  // src: "./fonts/LuckiestGuy-Regular.ttf",
  src: "./fonts/Marker_felt_wide_bold.ttf",
  variable: "--font-luckiest-guy",
  weight: "400",
});

export const metadata: Metadata = {
  title: "This Is App",
  description: "Learn word games",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientProvider>
        <html lang={locale}>
          <body
            className={`${luckiestGuy.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-tjblue-500 text-tjyellow-500 min-h-screen flex flex-col justify-between gap-6`}
          >
            {/* <Header /> */}
            <div className="-mt-6">
              <HeaderOne />
            </div>
            <main className="flex items-center gap-4 py-2 -mt-16 w-[90%] mx-auto">
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </ClientProvider>
    </NextIntlClientProvider>
  );
}
