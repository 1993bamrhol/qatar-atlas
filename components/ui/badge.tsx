import type {Locale,RelationshipType,VerificationStatus} from "@/types";
const verificationAr:Record<VerificationStatus,string>={VERIFIED:"موثّق",REVIEW_REQUIRED:"يتطلب مراجعة",ARCHIVED:"مؤرشف"};
const relationshipAr:Record<RelationshipType,string>={DIRECT:"مباشرة",INSTITUTIONAL:"مؤسسية",TEMPORAL:"زمنية"};
export function VerificationBadge({status,locale="en"}:{status:VerificationStatus;locale?:Locale}){return <span className={`qa-badge qa-badge--${status.toLowerCase()}`}>{locale==="ar"?verificationAr[status]:status.replaceAll("_"," ")}</span>}
export function RelationshipBadge({type,locale="en"}:{type:RelationshipType;locale?:Locale}){return <span className="qa-badge qa-badge--relationship">{locale==="ar"?relationshipAr[type]:type}</span>}
