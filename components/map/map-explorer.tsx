"use client";

import {useMemo,useState} from "react";
import Link from "next/link";
import {mapRecords,type MapCategory,type GeoStatus} from "@/data/map";
import {geoStatusAr,mapCategoryAr,mapRecordAr} from "@/data/map-ar";

const categories:["All",...MapCategory[]]=["All","Transport","Logistics","Urban","Free Zones","Institutions"];
const statusLabel:Record<GeoStatus,string>={AREA_VERIFIED:"AREA VERIFIED",PIN_VERIFIED:"PIN VERIFIED",REVIEW_REQUIRED:"REVIEW REQUIRED"};
const categoryFilterAr:Record<string,string>={All:"الكل",...mapCategoryAr};

export function MapExplorer({locale="en"}:{locale?:"ar"|"en"}){
  const ar=locale==="ar";
  const [category,setCategory]=useState<(typeof categories)[number]>("All");
  const [selected,setSelected]=useState("doha");
  const records=useMemo(()=>category==="All"?mapRecords:mapRecords.filter(r=>r.category===category),[category]);
  const visibleRecord=records.find(r=>r.id===selected)??records[0];
  const record=visibleRecord;
  const preciseRecords=records.filter(r=>r.geoStatus==="PIN_VERIFIED"&&r.publicPin);

  return <><div className="qa-map-toolbar"><div className="qa-container"><div className="qa-filter-row">
    {categories.map(c=><button type="button" key={c} aria-pressed={category===c} className={category===c?"is-active":""} onClick={()=>setCategory(c)}>{ar?categoryFilterAr[c]:c}</button>)}
  </div></div></div>
  <section className="qa-section"><div className="qa-container">
    <div className="qa-map-layout">
      <div className="qa-map-canvas">
        <div className="qa-qatar-silhouette" aria-hidden="true"/>
        <div className="qa-map-north">{ar?"ش":"N"}</div>
        {preciseRecords.map(r=>{const t=mapRecordAr[r.id];const name=ar?t?.name??r.name:r.name;return <button type="button" key={r.id} onClick={()=>setSelected(r.id)} className={"qa-map-marker"+(selected===r.id?" is-selected":"")} style={{left:r.canvas.x+"%",top:r.canvas.y+"%"}} aria-label={name}><span>•</span><strong>{name}</strong></button>})}
        {!preciseRecords.length&&<div className="qa-map-no-pins"><strong>{ar?"لا توجد نقاط دقيقة منشورة حاليًا":"No precise public pins yet"}</strong><span>{ar?"تظهر المواقع كـسياق منطقة موثق إلى أن تصبح الإحداثية PIN_VERIFIED.":"Records remain verified area context until an exact coordinate is PIN_VERIFIED."}</span></div>}
        <div className="qa-map-disclaimer">{ar?"لوحة جغرافية تخطيطية · العلامات تعرض سياق المنطقة الموثق، لا إحداثيات مساحية.":"Schematic geographic canvas · markers show verified area context, not surveyed coordinates."}</div>
      </div>
      <aside className="qa-map-panel"><div className="qa-map-record-list"><p className="qa-card-label">{ar?"سياق المنطقة الموثق":"VERIFIED AREA CONTEXT"}</p>{records.map(r=>{const t=mapRecordAr[r.id];const name=ar?t?.name??r.name:r.name;return <button type="button" key={r.id} className={selected===r.id?"is-active":""} onClick={()=>setSelected(r.id)}><span>{name}</span><small>{ar?geoStatusAr[r.geoStatus]:statusLabel[r.geoStatus]}</small></button>})}</div>{record&&(()=>{const t=mapRecordAr[record.id];return <><div className="qa-map-panel-head"><span>{ar?mapCategoryAr[record.category]:record.category}</span><b className={"qa-geo-status qa-geo-status--"+record.geoStatus.toLowerCase()}>{ar?geoStatusAr[record.geoStatus]:statusLabel[record.geoStatus]}</b></div>
        <h2>{ar?t?.name??record.name:record.name}</h2>
        <p className="qa-map-area">{ar?t?.area??record.area:record.area}</p>
        <p>{ar?t?.summary??record.summary:record.summary}</p>
        {record.projectHref&&<Link className="qa-text-link" href={`/${locale}${record.projectHref}`}>{ar?"افتح سجل الأطلس ←":"Open Atlas record →"}</Link>}
        <div className="qa-map-related"><p className="qa-card-label">{ar?"السجلات المرتبطة":"CONNECTED RECORDS"}</p>{(ar?t?.relatedRecords??record.relatedRecords:record.relatedRecords).map(x=><span key={x}>{x}</span>)}</div>
        <div className="qa-map-source"><p className="qa-card-label">{ar?"الأدلة الجغرافية":"GEOGRAPHIC EVIDENCE"}</p>
          {record.sourceUrl.startsWith("/")?<Link href={`/${locale}${record.sourceUrl}`}>{ar?t?.sourceLabel??"منهجية أطلس قطر":record.sourceLabel} →</Link>:<a href={record.sourceUrl} target="_blank" rel="noreferrer">{ar?t?.sourceLabel??record.sourceLabel:record.sourceLabel} ↗</a>}
          <small>{ar?`${t?.verificationNote??record.verificationNote} ولا تتحول أدلة مستوى المنطقة تلقائيًا إلى علامة عامة دقيقة.`:`${record.verificationNote} Area-level evidence never becomes an exact public pin automatically.`}</small>
        </div>
      </>})()}</aside>
    </div>
    <div className="qa-geo-model">
      <article><strong>{ar?"المنطقة موثقة":"AREA VERIFIED"}</strong><p>{ar?"يدعم المصدر المكان أو علاقة التجاور. قد يعرض الأطلس سياق المنطقة فقط.":"The source supports the place or adjacency relationship. Atlas may show regional context only."}</p></article>
      <article><strong>{ar?"الإحداثية موثقة":"PIN VERIFIED"}</strong><p>{ar?"تم التحقق بصورة مستقلة من إحداثية دقيقة، ويمكن نشرها كعلامة دقيقة.":"An exact coordinate has been independently verified and may be published as a precise marker."}</p></article>
      <article><strong>{ar?"يتطلب مراجعة":"REVIEW REQUIRED"}</strong><p>{ar?"أدلة الموقع غير مكتملة أو متعارضة، لذلك يبقى العرض العام الدقيق معطلاً.":"Location evidence is incomplete or conflicting. Precise public display remains disabled."}</p></article>
    </div>
  </div></section></>;
}
