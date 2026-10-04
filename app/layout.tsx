import "./globals.css";
import type {Metadata} from "next";
import {headers} from "next/headers";

export const metadata:Metadata={
  title:{default:"KOVUNELI | كوفونيلي",template:"%s | KOVUNELI"},
  description:"An evidence-led connected knowledge platform focused on Qatar",
  robots:{index:true,follow:true}
};

export default async function RootLayout({children}:{children:React.ReactNode}){
  const requestHeaders=await headers();
  const locale=requestHeaders.get("x-kovuneli-locale")==="ar"?"ar":"en";
  return <html lang={locale} dir={locale==="ar"?"rtl":"ltr"}><body>{children}</body></html>;
}
