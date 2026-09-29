import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {describe,expect,it} from "vitest";
import {EvidenceMetadata} from "@/components/ui/evidence-metadata";

describe("EvidenceMetadata",()=>{
  it("does not invent a review-date row when reviewedOn is absent",()=>{
    const html=renderToStaticMarkup(createElement(EvidenceMetadata,{
      evidence:{sourceKind:"PRIMARY_OFFICIAL",sensitivity:"STABLE"},
      locale:"en",
      showSourceKind:true
    }));
    expect(html).toContain("Source type");
    expect(html).toContain("PRIMARY OFFICIAL");
    expect(html).toContain("Time sensitivity");
    expect(html).not.toContain("Evidence review date");
    expect(html).not.toContain("<time");
  });

  it("shows reviewedOn but hides source kind when showSourceKind is false",()=>{
    const html=renderToStaticMarkup(createElement(EvidenceMetadata,{
      evidence:{sourceKind:"PRIMARY_OFFICIAL",reviewedOn:"2026-09-28",sensitivity:"HISTORICAL"},
      locale:"en"
    }));
    expect(html).toContain("Evidence review date");
    expect(html).toContain('dateTime="2026-09-28"');
    expect(html).toContain("HISTORICAL");
    expect(html).not.toContain("Source type");
  });

  it("renders Arabic evidence labels without changing semantics",()=>{
    const html=renderToStaticMarkup(createElement(EvidenceMetadata,{
      evidence:{sourceKind:"PRIMARY_OFFICIAL",reviewedOn:"2026-09-28",sensitivity:"STABLE"},
      locale:"ar",
      showSourceKind:true
    }));
    expect(html).toContain("بيانات مراجعة الدليل");
    expect(html).toContain("نوع المصدر");
    expect(html).toContain("مصدر رسمي أولي");
    expect(html).toContain("تاريخ مراجعة الدليل");
    expect(html).toContain("الحساسية الزمنية");
    expect(html).toContain("مستقر");
    expect(html).toContain('dateTime="2026-09-28"');
  });
});
