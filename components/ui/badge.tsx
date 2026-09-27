import type {Locale,RelationshipType,VerificationStatus} from "@/types";
import {relationshipLabel,verificationLabel} from "@/lib/evidence-i18n";
export function VerificationBadge({status,locale="en"}:{status:VerificationStatus;locale?:Locale}){return <span className={`qa-badge qa-badge--${status.toLowerCase()}`}>{verificationLabel(status,locale)}</span>}
export function RelationshipBadge({type,locale="en"}:{type:RelationshipType;locale?:Locale}){return <span className="qa-badge qa-badge--relationship">{relationshipLabel(type,locale)}</span>}
