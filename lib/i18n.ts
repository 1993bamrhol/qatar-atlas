import type { Locale } from "@/types";
export const locales:Locale[]=["en","ar"];export const defaultLocale:Locale="en";
export const localeMeta={en:{dir:"ltr" as const,label:"English"},ar:{dir:"rtl" as const,label:"العربية"}};
export function isLocale(value:string):value is Locale{return locales.includes(value as Locale)}\nexport function switchLocalePath(pathname:string,locale:Locale){\n  const other:Locale=locale==="en"?"ar":"en";\n  const rest=pathname.replace(/^\\/(en|ar)(?=\\/|$)/,"")||"";\n  return `/${other}${rest}`;\n}
