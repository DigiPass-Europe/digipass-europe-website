import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "../globals.css";

const instrument = localFont({
  src: "../../fonts/InstrumentSans-Variable.ttf",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DigiPass:Europe — The European hub for the Digital Product Passport",
    template: "%s · DigiPass:Europe",
  },
  description:
    "DigiPass:Europe brings together industry, technology providers, researchers and policymakers to accelerate the development, adoption and interoperability of Digital Product Passports across Europe.",
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${instrument.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
