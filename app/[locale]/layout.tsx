import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale} from "@/lib/i18n";
import {LocaleShell} from "@/components/layout/locale-shell";

export function generateStaticParams(){return [{locale:"en"},{locale:"ar"}]}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  if(!isLocale(locale)) return {};
  const ar=locale==="ar";
  const title=ar?"أطلس قطر":"Qatar Atlas";
  const description=ar
    ?"أطلس رقمي مستقل ثنائي اللغة ينظم معلومات قطر العامة المدعومة بالمصادر عبر القيادة والمؤسسات والاستراتيجيات والمشاريع والأماكن والخط الزمني."
    :"An independent bilingual digital atlas connecting source-backed public information about Qatar across leadership, institutions, strategies, projects, places and time.";
  return {
    title:{default:title,template:ar?"%s | أطلس قطر":"%s | Qatar Atlas"},
    description,
    openGraph:{title,description,type:"website",locale:ar?"ar_QA":"en_QA",siteName:ar?"أطلس قطر":"Qatar Atlas"},
    robots:{index:true,follow:true}
  };
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}
