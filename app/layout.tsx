import type { Metadata } from "next";
import "./globals.css";

import { JetBrains_Mono, Xanh_Mono, Homemade_Apple, Baskervville, Crimson_Text, Instrument_Serif } from "next/font/google";
import OrganizationSchema from "@/components/SchemaOrg";

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800'],
  display: 'swap',
});

export const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-homemade-apple",
});

const xanh = Xanh_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const baskervville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-baskervville",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-crimson-text",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Evven',
    default: 'Evven: Split Bills & Track Group Expenses Automatically',
  },
  description: 'Stop doing math in group chats. Evven automatically splits bills, tracks shared expenses, and settles balances instantly for roommates, trips, and teams. Free to start.',
  keywords: [
    'expense splitter',
    'bill splitter app',
    'group expense tracker',
    'roommate bill splitter',
    'shared expenses app',
    'trip expense splitter',
    'Evven',
    'expense management',
    'bill sharing',
    'group payments'
  ],
  authors: [{ name: 'Evven Team' }],
  creator: 'Evven',
  publisher: 'Evven',
  formatDetection: {
    telephone: false,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/Evven-black.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/Evven-white.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },


  openGraph: {
    title: 'Evven: Split bills. Not friendships.',
    description: 'Keep shared costs fair, clear, and totally handled. Evven makes group expense tracking simple and automated.',
    url: 'https://evven.xyz',
    siteName: 'Evven',
    images: [
      {
        url: 'https://evven.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Evven - Split expenses. Stay even.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evven: Split bills. Not friendships.',
    description: 'Keep shared costs fair, clear, and totally handled.',
    images: ['https://evven.xyz/og-image.png'],
    creator: '@EvvenHQ',
  },

  alternates: {
    canonical: 'https://evven.xyz',
    languages: {
      'en-US': 'https://evven.xyz',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetBrains.className} ${xanh.className} ${homemadeApple.variable} ${baskervville.className} ${crimsonText.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,901,1&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://api.fontshare.com/v2/css?f[]=dancing-script@400,700&display=swap" 
          rel="stylesheet"
        />
        <OrganizationSchema />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
