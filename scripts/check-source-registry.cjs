const fs=require("fs");
const read=p=>fs.readFileSync(p,"utf8");
const errors=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};

const canonical=["data/projects.ts","data/leadership.ts","data/connections.ts","data/map.ts","data/timeline.ts"];
const external=new Set();
for(const path of canonical){
  const text=read(path);
  for(const match of text.matchAll(/(?:sourceUrl|url):"(https:\/\/[^"]+)"/g))external.add(match[1]);
}
assert(external.size>=26,"Expected at least 26 unique external evidence URLs, found "+external.size);
for(const url of external)assert(url.startsWith("https://"),"Registry source must use HTTPS: "+url);

const registry=read("data/source-registry.ts");
for(const token of [
  'from "@/data/projects"',
  'from "@/data/leadership"',
  'from "@/data/connections"',
  'from "@/data/map"',
  'from "@/data/timeline"',
  'from "@/data/source-health"',
  'for(const project of projects)',
  'for(const person of leaders)',
  'for(const edge of graphEdges)',
  'for(const item of rulerPeriods)',
  'for(const item of historicalMilestones)',
  'for(const item of mapRecords)'
])assert(registry.includes(token),"Source registry builder missing canonical coverage contract: "+token);
assert(registry.includes('if(!args.url||args.url.startsWith("/"))return;'),"Internal methodology links must not be treated as external evidence sources");
assert(registry.includes("labelAr:string"),"Linked source records must carry an Arabic display label");
assert(registry.includes("access:SourceAccessAudit"),"Registry entries must expose source-access audit metadata");
for(const token of ['connectionEdgeAr','mapRecordAr','rulerAr','milestoneAr'])assert(registry.includes(token),"Arabic source-registry reuse missing: "+token);
for(const token of ['id:item.id','rulerAr[item.id]','milestoneAr[item.id]'])assert(registry.includes(token),"Timeline source-registry stable-ID contract missing: "+token);
assert(!registry.includes('item.year+"-"+item.title'),"Timeline source-registry identity must not be derived from mutable year/title display fields");
for(const token of ["evidence?:EvidenceReviewMeta","sourceKind:item.evidence.sourceKind","reviewedOn:item.evidence.reviewedOn","sensitivity:item.evidence.sensitivity","sourceKind:item.evidence?.sourceKind","reviewedOn:item.evidence?.reviewedOn","sensitivity:item.evidence?.sensitivity"])assert(registry.includes(token),"Evidence metadata registry propagation missing: "+token);
assert(registry.includes("existing.records.push({...args.record,...(evidence?{evidence}:{})})"),"Source registry must preserve record-level evidence metadata instead of only URL-level aggregates");

const digitalAgendaLegacy="https://www.mcit.gov.qa/en/nda";
const digitalAgendaCanonical="https://www.mcit.gov.qa/en/about-us/digital-agenda-2030";
const projects=read("data/projects.ts");
assert(projects.includes('sourceLabel:"MCIT · Digital Agenda 2030",sourceUrl:"'+digitalAgendaCanonical+'"'),"Digital Agenda project must display the approved canonical MCIT URL");
assert(!projects.includes('sourceUrl:"'+digitalAgendaLegacy+'"'),"Digital Agenda project must not expose the legacy MCIT URL");
assert(registry.includes('resolveSourceUrlAlias'),"Source registry must resolve the explicit Digital Agenda legacy alias before identity lookup");
assert(registry.includes('"'+digitalAgendaCanonical+'":"وزارة الاتصالات وتكنولوجيا المعلومات · الأجندة الرقمية 2030"'),"Digital Agenda Arabic source label must be keyed by the canonical URL");
assert(!registry.includes('"'+digitalAgendaLegacy+'":"وزارة الاتصالات وتكنولوجيا المعلومات · الأجندة الرقمية 2030"'),"Legacy Digital Agenda URL must not remain a displayed Source Registry label key");

const health=read("data/source-health.ts");
const healthEntries=[...health.matchAll(/"(https:\/\/[^"]+)":\{checkedOn:"(\d{4}-\d{2}-\d{2})",nextCheckOn:"(\d{4}-\d{2}-\d{2})",status:"(ACCESSIBLE|REDIRECTED|REVIEW_REQUIRED)"/g)]
  .map(m=>({url:m[1],checkedOn:m[2],nextCheckOn:m[3],status:m[4]}));
const healthMap=new Map(healthEntries.map(x=>[x.url,x]));
assert(health.includes('"'+digitalAgendaLegacy+'":"'+digitalAgendaCanonical+'"'),"Digital Agenda legacy-to-canonical alias mapping must remain explicit");
assert(healthMap.has(digitalAgendaCanonical),"Canonical Digital Agenda URL must have source-health coverage");
assert(!healthMap.has(digitalAgendaLegacy),"Legacy Digital Agenda URL must not create a second source-health identity");
assert([...external].filter(url=>url===digitalAgendaCanonical).length===1,"Canonical Digital Agenda URL must appear once in canonical evidence URLs");
assert(!external.has(digitalAgendaLegacy),"Legacy Digital Agenda URL must not remain in canonical evidence URLs");
assert(healthMap.size===healthEntries.length,"Duplicate source-access audit URL detected");
for(const url of external)assert(healthMap.has(url),"Missing source-access audit: "+url);
for(const url of healthMap.keys())assert(external.has(url),"Source-access audit has no canonical evidence URL: "+url);

const today=new Date();
today.setUTCHours(0,0,0,0);
for(const item of healthEntries){
  const checked=new Date(item.checkedOn+"T00:00:00Z");
  const next=new Date(item.nextCheckOn+"T23:59:59Z");
  assert(!Number.isNaN(checked.getTime()),"Invalid checkedOn date: "+item.url);
  assert(!Number.isNaN(next.getTime()),"Invalid nextCheckOn date: "+item.url);
  assert(next>=checked,"nextCheckOn precedes checkedOn: "+item.url);
  assert(item.status!=="REVIEW_REQUIRED","Source still requires review: "+item.url);
  assert(today<=next,"Source-access audit expired on "+item.nextCheckOn+": "+item.url);
}

const page=read("app/[locale]/sources/page.tsx");
for(const token of ["SourceRegistryExplorer","sourceRegistryStats","Record review date is not source publication date","تاريخ مراجعة السجل ليس تاريخ نشر المصدر","Source access status is an observation","حالة الوصول إلى المصدر هي ملاحظة"])
  assert(page.includes(token),"Source registry page missing provenance/access disclosure: "+token);

const nav=read("lib/constants.ts");
assert(nav.includes('"sources"'),"Primary navigation must expose source registry");
const sitemap=read("app/sitemap.ts");
assert(sitemap.includes('"sources"'),"Sitemap must include source registry");

if(errors.length){
  console.error("Source registry audit failed:\n"+errors.join("\n"));
  process.exit(1);
}
console.log("Source registry audit passed: "+external.size+" evidence URLs have current access-audit coverage.");