import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:{default:"Qatar Atlas | أطلس قطر",template:"%s | Qatar Atlas"},description:"Independent, source-backed bilingual digital atlas of Qatar."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" dir="ltr"><body>{children}</body></html>}
