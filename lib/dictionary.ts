import type {Locale} from "@/types";
export const dictionaries={en:{nav:{leadership:"Leadership",projects:"Projects",timeline:"Timeline",connections:"Connections",map:"Map"},brand:"QATAR ATLAS",brandAlt:"أطلس قطر",home:"Home"},ar:{nav:{leadership:"القيادة",projects:"المشاريع",timeline:"الخط الزمني",connections:"الروابط",map:"الخريطة"},brand:"أطلس قطر",brandAlt:"QATAR ATLAS",home:"الرئيسية"}} as const;
export function getDictionary(locale:Locale){return dictionaries[locale]}
