import type {EvidenceSensitivity,EvidenceMeta,Locale} from "@/types";

const sourceKindAr:Record<EvidenceMeta["sourceKind"],string>={
  PRIMARY_OFFICIAL:"مصدر رسمي أولي",
  SECONDARY_OFFICIAL:"مصدر رسمي داعم",
  PUBLIC_REFERENCE:"مرجع عام"
};

const sensitivityAr:Record<EvidenceSensitivity,string>={
  STABLE:"مستقر",
  TIME_SENSITIVE:"حساس للوقت",
  TARGET:"هدف / توقع",
  HISTORICAL:"تاريخي"
};

export function sourceKindLabel(kind:EvidenceMeta["sourceKind"],locale:Locale){
  return locale==="ar"?sourceKindAr[kind]:kind.replaceAll("_"," ");
}
export function sensitivityLabel(value:EvidenceSensitivity,locale:Locale){
  return locale==="ar"?sensitivityAr[value]:value.replaceAll("_"," ");
}
