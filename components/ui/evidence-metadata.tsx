import type {EvidenceReviewMeta,Locale} from "@/types";
import {sensitivityLabel,sourceKindLabel} from "@/lib/evidence-i18n";

function formatReviewDate(value:string,locale:Locale){
  const [year,month,day]=value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale==="ar"?"ar-QA":"en-GB",{
    day:"numeric",
    month:"short",
    year:"numeric",
    timeZone:"UTC"
  }).format(new Date(Date.UTC(year,month-1,day)));
}

export function EvidenceMetadata({
  evidence,
  locale="en",
  showSourceKind=false,
  compact=false
}:{
  evidence?:EvidenceReviewMeta;
  locale?:Locale;
  showSourceKind?:boolean;
  compact?:boolean;
}){
  if(!evidence)return null;
  const ar=locale==="ar";
  return <dl
    className={"qa-evidence-meta"+(compact?" qa-evidence-meta--compact":"")}
    aria-label={ar?"بيانات مراجعة الدليل":"Evidence review metadata"}
  >
    {showSourceKind&&<div>
      <dt>{ar?"نوع المصدر":"Source type"}</dt>
      <dd>{sourceKindLabel(evidence.sourceKind,locale)}</dd>
    </div>}
    {evidence.reviewedOn&&<div>
      <dt>{ar?"تاريخ مراجعة الدليل":"Evidence review date"}</dt>
      <dd><time dateTime={evidence.reviewedOn}>{formatReviewDate(evidence.reviewedOn,locale)}</time></dd>
    </div>}
    <div>
      <dt>{ar?"الحساسية الزمنية":"Time sensitivity"}</dt>
      <dd>{sensitivityLabel(evidence.sensitivity,locale)}</dd>
    </div>
  </dl>;
}
