"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {graphEdges,graphNodes,nodeById,type GraphNodeKind} from "@/data/connections";
import {connectionEdgeAr,connectionNodeAr,graphKindAr} from "@/data/connections-ar";
import {relationshipLabel,sensitivityLabel,sourceKindLabel} from "@/lib/evidence-i18n";
import {RelationshipBadge,VerificationBadge} from "@/components/ui/badge";
import type {RelationshipType} from "@/types";

const kinds:["All",...GraphNodeKind[]]=["All","Leadership","Institution","Strategy","Project","Place"];
const approvedRelationships=graphEdges.reduce<RelationshipType[]>((items,edge)=>items.includes(edge.relationship)?items:[...items,edge.relationship],[]);
const relationships:["All",...RelationshipType[]]=["All",...approvedRelationships];
const kindFilterAr:Record<string,string>={All:"الكل",Leadership:"القيادة",Institution:"المؤسسات",Strategy:"الاستراتيجيات",Project:"المشاريع",Place:"الأماكن"};

export function ConnectionsExplorer({locale="en"}:{locale?:"ar"|"en"}){
  const ar=locale==="ar";
  const [kind,setKind]=useState<(typeof kinds)[number]>("All");
  const [relationship,setRelationship]=useState<(typeof relationships)[number]>("All");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState("doha-metro");
  const visibleEdges=useMemo(()=>relationship==="All"?graphEdges:graphEdges.filter(e=>e.relationship===relationship),[relationship]);
  const connectedIds=useMemo(()=>new Set(visibleEdges.flatMap(e=>[e.from,e.to])),[visibleEdges]);
  const nodes=useMemo(()=>graphNodes.filter(n=>{
    const label=ar?(connectionNodeAr[n.id]??n.label):n.label;
    return (kind==="All"||n.kind===kind)&&(!query||label.toLowerCase().includes(query.toLowerCase()))&&(relationship==="All"||connectedIds.has(n.id));
  }),[kind,query,relationship,connectedIds,ar]);
  const node=nodeById(selected);
  const edges=visibleEdges.filter(e=>e.from===selected||e.to===selected);

  return <><div className="qa-connections-toolbar"><div className="qa-container"><div className="qa-connections-controls">
    <input aria-label={ar?"البحث في روابط قطر":"Search Qatar Connections"} placeholder={ar?"ابحث عن أشخاص أو مؤسسات أو مشاريع…":"Search people, institutions, projects…"} value={query} onChange={e=>setQuery(e.target.value)}/>
    <div className="qa-filter-row">{kinds.map(k=><button key={k} type="button" aria-pressed={kind===k} className={kind===k?"is-active":""} onClick={()=>setKind(k)}>{ar?kindFilterAr[k]:k}</button>)}</div>
    <div className="qa-filter-row qa-filter-row--relationship">{relationships.map(r=><button key={r} type="button" aria-pressed={relationship===r} className={relationship===r?"is-active":""} onClick={()=>setRelationship(r)}>{r==="All"?(ar?"الكل":"All"):relationshipLabel(r,locale)}</button>)}</div>
  </div></div></div>
  <section className="qa-section"><div className="qa-container">
    <div className="qa-graph-stats"><strong>{graphNodes.length}</strong><span>{ar?"عقد موثقة":"verified nodes"}</span><strong>{graphEdges.length}</strong><span>{ar?"علاقات مدعومة بالأدلة":"evidence-backed relationships"}</span></div>
    <div className="qa-graph-layout">
      <div className="qa-graph-canvas" aria-label={ar?"مستكشف روابط قطر":"Qatar Connections explorer"}>{nodes.length?nodes.map(n=><button type="button" onClick={()=>setSelected(n.id)} className={"qa-graph-node qa-graph-node--"+n.kind.toLowerCase()+(selected===n.id?" is-selected":"")} key={n.id}><small>{ar?graphKindAr[n.kind]:n.kind}</small><strong>{ar?connectionNodeAr[n.id]??n.label:n.label}</strong></button>):<div className="qa-graph-empty">{ar?"لا توجد عقد موثقة تطابق هذه المرشحات.":"No verified nodes match these filters."}</div>}</div>
      <aside className="qa-graph-panel">{node?<><div className="qa-graph-panel-head"><span>{ar?graphKindAr[node.kind]:node.kind}</span><VerificationBadge status={node.verification} locale={locale}/></div>
        <h2>{ar?connectionNodeAr[node.id]??node.label:node.label}</h2>
        {node.href&&<Link className="qa-text-link" href={`/${locale}${node.href}`}>{ar?"افتح سجل كوفونيلي ←":"Open KOVUNELI record →"}</Link>}
        <div className="qa-graph-evidence"><p className="qa-card-label">{ar?"علاقات مدعومة بالأدلة":"EVIDENCE-BACKED CONNECTIONS"}</p>
          {edges.length?edges.map(edge=>{const other=nodeById(edge.from===node.id?edge.to:edge.from);const translated=connectionEdgeAr[edge.id];return <article key={edge.id}><div><strong>{other?(ar?connectionNodeAr[other.id]??other.label:other.label):""}</strong><RelationshipBadge type={edge.relationship} locale={locale}/></div><p>{ar?translated?.label??edge.label:edge.label}</p><small>{ar?translated?.evidence??edge.evidence:edge.evidence}</small><small>{ar?`${sourceKindLabel(edge.evidenceMeta.sourceKind,locale)} · مراجعة السجل ${edge.evidenceMeta.verifiedOn} · ${sensitivityLabel(edge.evidenceMeta.sensitivity,locale)}`:`${sourceKindLabel(edge.evidenceMeta.sourceKind,locale)} · record reviewed ${edge.evidenceMeta.verifiedOn} · ${sensitivityLabel(edge.evidenceMeta.sensitivity,locale)}`}</small><a href={edge.sourceUrl} target="_blank" rel="noreferrer">{ar?"مصدر الدليل ↗":"Evidence source ↗"}</a></article>}):<p className="qa-source-note">{ar?"لا توجد علاقة ضمن مرشح العلاقات الحالي. اختر عقدة أخرى أو نوع علاقة مختلفًا.":"No connection under the current relationship filter. Select another node or relationship type."}</p>}
        </div>
      </>:null}</aside>
    </div>
  </div></section></>;
}
