import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Fondamento, Geist_Mono, Luckiest_Guy, Sniglet } from "next/font/google";


const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  weight: "400", // Only "400" is available for Luckiest Guy
  subsets: ["latin"],
});

const SnigletMono = Sniglet({
  variable: "--font-snig",
  subsets: ["latin"],
  weight: ["400", "800"],
});

const FondamentoMono = Fondamento({
  variable: "--font-fondamento",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "JAKP - Jesus Answers Kids Prayers",
  description: "Jesus Answers Kids Prayers - A global movement to get kids pray from all around the world. Get your kids to pray and share their prayers with the world.",
  keywords: "JAKP, Jesus Answers Kids Prayers, children praying, prayer, kids praying, loveworld, Completeness, 2025, Christ Embassy, Pst Chris Oyakhimome, Rev Chris Oyakhilome, lovetoons, lovetoonstv, lets pray, kiddies praying, Kids Prayer, Global Prayer Movement, Children Prayer, Christian Kids, Faith, Prayer Community",
  authors: [{ name: "Lovetoons TV", url: "https://github.com/PromzzyKoncepts/JAKP" }],
  creator: "Promise Okechukwu",
  openGraph: {
    title: "JAKP - Jesus Answers Kids Prayers",
    description: "Jesus Answers Kids Prayers - A global movement to get kids pray from all around the world. Get your kids to pray and share their prayers with the world.",
    url: "https://jakp.lovetoons.org",
    siteName: "JAKP - Jesus Answers Kids Prayers",
  },
 icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
       <link rel="icon" href="/public/logo.png" />
     </head>
      <body
        className={`${luckiestGuy.variable} ${SnigletMono.variable}  ${FondamentoMono.variable} antialiased`}
      >
        <Toaster position="top-right"/>
        {children}
      </body>
    </html>
  );
}
