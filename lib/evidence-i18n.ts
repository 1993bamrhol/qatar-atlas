import type {EvidenceSensitivity,EvidenceSourceKind,Locale,RelationshipType,VerificationStatus} from "@/types";

const sourceKindAr:Record<EvidenceSourceKind,string>={
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

const verificationAr:Record<VerificationStatus,string>={
  VERIFIED:"موثّق",
  REVIEW_REQUIRED:"يتطلب مراجعة",
  ARCHIVED:"مؤرشف"
};

const relationshipAr:Record<RelationshipType,string>={
  DIRECT:"مباشرة",
  INSTITUTIONAL:"مؤسسية",
  TEMPORAL:"زمنية"
};

export function sourceKindLabel(kind:EvidenceSourceKind,locale:Locale){
  return locale==="ar"?sourceKindAr[kind]:kind.replaceAll("_"," ");
}
export function sensitivityLabel(value:EvidenceSensitivity,locale:Locale){
  return locale==="ar"?sensitivityAr[value]:value.replaceAll("_"," ");
}
export function verificationLabel(value:VerificationStatus,locale:Locale){
  return locale==="ar"?verificationAr[value]:value.replaceAll("_"," ");
}
export function relationshipLabel(value:RelationshipType,locale:Locale){
  return locale==="ar"?relationshipAr[value]:value;
}
