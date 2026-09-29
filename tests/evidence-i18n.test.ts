import {describe,expect,it} from "vitest";
import {relationshipLabel,sensitivityLabel,sourceKindLabel,verificationLabel} from "@/lib/evidence-i18n";

describe("evidence i18n helpers",()=>{
  it("maps every supported source kind in English and Arabic",()=>{
    expect([
      sourceKindLabel("PRIMARY_OFFICIAL","en"),
      sourceKindLabel("SECONDARY_OFFICIAL","en"),
      sourceKindLabel("PUBLIC_REFERENCE","en")
    ]).toEqual(["PRIMARY OFFICIAL","SECONDARY OFFICIAL","PUBLIC REFERENCE"]);
    expect([
      sourceKindLabel("PRIMARY_OFFICIAL","ar"),
      sourceKindLabel("SECONDARY_OFFICIAL","ar"),
      sourceKindLabel("PUBLIC_REFERENCE","ar")
    ]).toEqual(["مصدر رسمي أولي","مصدر رسمي داعم","مرجع عام"]);
  });

  it("maps every supported sensitivity in English and Arabic",()=>{
    expect(["STABLE","TIME_SENSITIVE","TARGET","HISTORICAL"].map(value=>sensitivityLabel(value as "STABLE"|"TIME_SENSITIVE"|"TARGET"|"HISTORICAL","en")))
      .toEqual(["STABLE","TIME SENSITIVE","TARGET","HISTORICAL"]);
    expect(["STABLE","TIME_SENSITIVE","TARGET","HISTORICAL"].map(value=>sensitivityLabel(value as "STABLE"|"TIME_SENSITIVE"|"TARGET"|"HISTORICAL","ar")))
      .toEqual(["مستقر","حساس للوقت","هدف / توقع","تاريخي"]);
  });

  it("maps every supported verification state in English and Arabic",()=>{
    expect(["VERIFIED","REVIEW_REQUIRED","ARCHIVED"].map(value=>verificationLabel(value as "VERIFIED"|"REVIEW_REQUIRED"|"ARCHIVED","en")))
      .toEqual(["VERIFIED","REVIEW REQUIRED","ARCHIVED"]);
    expect(["VERIFIED","REVIEW_REQUIRED","ARCHIVED"].map(value=>verificationLabel(value as "VERIFIED"|"REVIEW_REQUIRED"|"ARCHIVED","ar")))
      .toEqual(["موثّق","يتطلب مراجعة","مؤرشف"]);
  });

  it("maps every supported relationship type in English and Arabic",()=>{
    expect(["DIRECT","INSTITUTIONAL","TEMPORAL"].map(value=>relationshipLabel(value as "DIRECT"|"INSTITUTIONAL"|"TEMPORAL","en")))
      .toEqual(["DIRECT","INSTITUTIONAL","TEMPORAL"]);
    expect(["DIRECT","INSTITUTIONAL","TEMPORAL"].map(value=>relationshipLabel(value as "DIRECT"|"INSTITUTIONAL"|"TEMPORAL","ar")))
      .toEqual(["مباشرة","مؤسسية","زمنية"]);
  });
});
