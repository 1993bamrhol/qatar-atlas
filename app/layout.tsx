import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Qatar Atlas | أطلس قطر",description:"Independent, source-backed bilingual digital atlas of Qatar."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
