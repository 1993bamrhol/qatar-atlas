import type { RelationshipType,VerificationStatus } from "@/types";
export function VerificationBadge({status}:{status:VerificationStatus}){return <span className={`qa-badge qa-badge--${status.toLowerCase()}`}>{status.replaceAll("_"," ")}</span>}
export function RelationshipBadge({type}:{type:RelationshipType}){return <span className="qa-badge qa-badge--relationship">{type}</span>}
