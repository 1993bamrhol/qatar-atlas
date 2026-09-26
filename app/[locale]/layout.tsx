import {notFound} from "next/navigation";import {isLocale} from "@/lib/i18n";import {LocaleShell} from "@/components/layout/locale-shell";
export function generateStaticParams(){return [{locale:"en"},{locale:"ar"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <LocaleShell locale={locale}>{children}</LocaleShell>}
