export type VerificationStatus="VERIFIED"|"REVIEW_REQUIRED"|"ARCHIVED";
export type RelationshipType="DIRECT"|"INSTITUTIONAL"|"TEMPORAL";
export type Locale="ar"|"en";
export type EvidenceSensitivity="STABLE"|"TIME_SENSITIVE"|"TARGET"|"HISTORICAL";
export type EvidenceSourceKind="PRIMARY_OFFICIAL"|"SECONDARY_OFFICIAL"|"PUBLIC_REFERENCE";
export type EvidenceMeta={sourceKind:EvidenceSourceKind;verifiedOn:string;sensitivity:EvidenceSensitivity;note?:string};
