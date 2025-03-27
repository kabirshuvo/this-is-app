import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientProvider from "@/app/context/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import HeaderOne from "@/components/shared/header/headerOne";
import Footer from "@/components/shared/Footer";
import "../../globals.css";
import NotFound from "./not-found";
import { ReactNode } from "react";

const merkerFelt = localFont({
  src: "../../fonts/Marker_felt_wide_bold.ttf",
  variable: "--font-marker-felt",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "This Is App",
  description: "Learn word games",
};

// Define the type for the component props
type RootLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

// Generate static paths for all supported locales
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zu" }]; // Add all supported locales
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Destructure `locale` from `params`
  const { locale } = params;

  let messages: Record<string, string>;
  try {
    // Dynamically import the messages for the given locale
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    // If the locale file doesn't exist, render the `NotFound` page
    return <NotFound />;
  }

  return (
    <html lang={locale}>
      <body
        className={`${merkerFelt.variable} antialiased bg-tjblue-500 text-tjyellow-500 min-h-screen flex flex-col justify-between`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProvider>
            <div className="-mt-6">
              <HeaderOne />
            </div>
            <main className="flex items-center gap-4 py-2 -mt-24 md:-mt-8 container mx-auto">
              {children}
            </main>
            <Footer />
          </ClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}