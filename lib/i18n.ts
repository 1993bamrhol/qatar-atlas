import type { Locale } from "@/types";
export const locales:Locale[]=["en","ar"];export const defaultLocale:Locale="en";
export const localeMeta={en:{dir:"ltr" as const,label:"English"},ar:{dir:"rtl" as const,label:"العربية"}};
export function isLocale(value:string):value is Locale{return locales.includes(value as Locale)}
export function switchLocalePath(pathname:string,locale:Locale){
  const other:Locale=locale==="en"?"ar":"en";
  const rest=pathname.replace(/^\/(en|ar)(?=\/|$)/,"")||"";
  return `/${other}${rest}`;
}
