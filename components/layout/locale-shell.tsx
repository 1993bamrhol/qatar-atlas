"use client";
import type {Locale} from "@/types";
import {LocaleProvider} from "@/components/i18n/locale-context";

export function LocaleShell({locale,children}:{locale:Locale;children:React.ReactNode}){
  return <LocaleProvider locale={locale}><div lang={locale} dir={locale==="ar"?"rtl":"ltr"} className={locale==="ar"?"qa-locale qa-locale--ar":"qa-locale"}>{children}</div></LocaleProvider>;
}
