"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import type {SourceRegistryEntry,SourceRole} from "@/data/source-registry";
import {sourceKindLabel,sensitivityLabel} from "@/lib/evidence-i18n";

const roles:["All",...SourceRole[]]=["All","PRIMARY_RECORD","SUPPORTING_RECORD","RELATIONSHIP_EVIDENCE","TIMELINE_EVIDENCE","GEOGRAPHIC_EVIDENCE"];
const roleEn:Record<string,string>={All:"All",PRIMARY_RECORD:"Primary record",SUPPORTING_RECORD:"Supporting",RELATIONSHIP_EVIDENCE:"Relationship evidence",TIMELINE_EVIDENCE:"Timeline evidence",GEOGRAPHIC_EVIDENCE:"Geographic evidence"};
const roleAr:Record<string,string>={All:"الكل",PRIMARY_RECORD:"مصدر سجل أساسي",SUPPORTING_RECORD:"مصدر داعم",RELATIONSHIP_EVIDENCE:"دليل علاقة",TIMELINE_EVIDENCE:"دليل زمني",GEOGRAPHIC_EVIDENCE:"دليل جغرافي"};
const kindAr:Record<string,string>={Project:"مشروع",Leadership:"قيادة",Connection:"علاقة",Timeline:"خط زمني",Map:"خريطة"};
const accessEn:Record<string,string>={ACCESSIBLE:"Accessible",REDIRECTED:"Redirected",REVIEW_REQUIRED:"Review required"};
const accessAr:Record<string,string>={ACCESSIBLE:"متاح",REDIRECTED:"معاد التوجيه",REVIEW_REQUIRED:"يتطلب مراجعة"};

export function SourceRegistryExplorer({locale,entries}:{locale:"ar"|"en";entries:SourceRegistryEntry[]}){
  const ar=locale==="ar";
  const [query,setQuery]=useState("");
  const [role,setRole]=useState<(typeof roles)[number]>("All");
  const filtered=useMemo(()=>entries.filter(entry=>{
    const haystack=[entry.label,entry.labelAr,entry.publisher,entry.publisherAr,...entry.records.flatMap(r=>[r.label,r.labelAr])].join(" ").toLowerCase();
    return (!query||haystack.includes(query.toLowerCase()))&&(role==="All"||entry.roles.includes(role));
  }),[entries,query,role]);
  return <div className="qa-source-registry">
    <div className="qa-source-toolbar">
      <input aria-label={ar?"البحث في سجل المصادر":"Search source registry"} placeholder={ar?"ابحث عن جهة أو مصدر أو سجل…":"Search publisher, source or linked record…"} value={query} onChange={e=>setQuery(e.target.value)}/>
      <div className="qa-filter-row">{roles.map(r=><button type="button" key={r} aria-pressed={role===r} className={role===r?"is-active":""} onClick={()=>setRole(r)}>{ar?roleAr[r]:roleEn[r]}</button>)}</div>
    </div>
    <p className="qa-source-result-count">{ar?filtered.length+" مصدرًا مطابقًا":filtered.length+" matching sources"}</p>
    <div className="qa-source-list">
      {filtered.map(entry=><article className="qa-source-card" id={entry.id} key={entry.url}>
        <div className="qa-source-card-head">
          <div>
            <p className="qa-card-label">{ar?entry.publisherAr:entry.publisher}</p>
            <h2>{ar?entry.labelAr:entry.label}</h2>
          </div>
          <a className="qa-source-open" href={entry.url} target="_blank" rel="noreferrer">{ar?"فتح المصدر ↗":"Open source ↗"}</a>
        </div>
        <div className="qa-source-role-row">{entry.roles.map(r=><span key={r}>{ar?roleAr[r]:roleEn[r]}</span>)}<span className={"qa-source-health qa-source-health--"+entry.access.status.toLowerCase()}>{ar?accessAr[entry.access.status]:accessEn[entry.access.status]}</span></div>
        <dl className="qa-source-meta">
          <div><dt>{ar?"نوع المصدر":"Source type"}</dt><dd>{entry.sourceKinds.length?entry.sourceKinds.map(x=>sourceKindLabel(x,locale)).join(" · "):(ar?"غير مصنف مستقلًا في بيانات الدليل":"Not independently classified in evidence metadata")}</dd></div>
          <div><dt>{ar?"مراجعة السجل":"Record review"}</dt><dd>{entry.reviewedOn.length?entry.reviewedOn.join(" · "):(ar?"لا يوجد تاريخ مراجعة مستقل لهذا المصدر":"No independent source-review date recorded")}</dd></div>
          <div><dt>{ar?"حساسية الزمن":"Time sensitivity"}</dt><dd>{entry.sensitivities.length?entry.sensitivities.map(x=>sensitivityLabel(x,locale)).join(" · "):(ar?"غير مطبقة على هذا النوع من الأدلة":"Not applied to this evidence type")}</dd></div>
          <div><dt>{ar?"فحص المصدر":"Source access check"}</dt><dd>{entry.access.checkedOn|| (ar?"غير مفحوص":"Not checked")}</dd></div>
          <div><dt>{ar?"الفحص التالي":"Next access check"}</dt><dd>{entry.access.nextCheckOn||"—"}</dd></div>
          <div><dt>{ar?"السجلات المرتبطة":"Linked records"}</dt><dd>{entry.records.length}</dd></div>
        </dl>
        {entry.access.note&&<p className="qa-source-health-note">{ar?"ملاحظة الفحص: ":"Audit note: "}{ar?(entry.access.noteAr??entry.access.note):entry.access.note}</p>}
        <div className="qa-source-links">
          {entry.records.map(record=>record.href?<Link key={record.kind+record.id} href={`/${locale}${record.href}`}><small>{ar?kindAr[record.kind]:record.kind}</small><strong>{ar?record.labelAr:record.label}</strong></Link>:<span key={record.kind+record.id}><small>{ar?kindAr[record.kind]:record.kind}</small><strong>{record.label}</strong></span>)}
        </div>
      </article>)}
      {!filtered.length&&<div className="qa-graph-empty">{ar?"لا توجد مصادر تطابق هذا البحث.":"No sources match this search."}</div>}
    </div>
  </div>;
}