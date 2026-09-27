import {projects} from "@/data/projects";
import {projectsAr} from "@/data/projects-ar";
import {leaders} from "@/data/leadership";
import {leadershipAr} from "@/data/leadership-ar";
import {graphEdges} from "@/data/connections";
import {connectionEdgeAr} from "@/data/connections-ar";
import {mapRecords} from "@/data/map";
import {mapRecordAr} from "@/data/map-ar";
import {rulerPeriods,historicalMilestones} from "@/data/timeline";
import {rulerAr,milestoneAr} from "@/data/timeline-ar";
import type {EvidenceSensitivity,EvidenceMeta} from "@/types";
import {sourceHealthByUrl,type SourceAccessAudit} from "@/data/source-health";

export type SourceRole="PRIMARY_RECORD"|"SUPPORTING_RECORD"|"RELATIONSHIP_EVIDENCE"|"TIMELINE_EVIDENCE"|"GEOGRAPHIC_EVIDENCE";
export type SourceRecordKind="Project"|"Leadership"|"Connection"|"Timeline"|"Map";
export type SourceRecordRef={kind:SourceRecordKind;id:string;label:string;labelAr:string;href?:string};
export type SourceRegistryEntry={
  id:string;
  label:string;
  labelAr:string;
  url:string;
  publisher:string;
  publisherAr:string;
  roles:SourceRole[];
  records:SourceRecordRef[];
  sourceKinds:EvidenceMeta["sourceKind"][];
  reviewedOn:string[];
  sensitivities:EvidenceSensitivity[];
  access:SourceAccessAudit;
};

const labelEnByUrl:Record<string,string>={"https://www.lusail.com/the-city-of-a-lifetime/":"Lusail · The City of a Lifetime"};

const labelArByUrl:Record<string,string>={
"https://diwan.gov.qa/hh-the-amir/biography?sc_lang=en":"الديوان الأميري · السيرة الرسمية للأمير",
"https://www.diwan.gov.qa/en/hh-deputy-amir/biography":"الديوان الأميري · السيرة الرسمية لنائب الأمير",
"https://www.diwan.gov.qa/en/about-qatar/qatars-rulers":"الديوان الأميري · حكام قطر",
"https://diwan.gov.qa/en/About-Qatar/History-of-Qatar":"الديوان الأميري · تاريخ قطر",
"https://diwan.gov.qa/en/About-Qatar/Qatars-Rulers/Sheikh-Jassim-Bin-Mohammed-Bin-Thani":"الديوان الأميري · سيرة الشيخ جاسم بن محمد بن ثاني",
"https://diwan.gov.qa/about-qatar/qatars-rulers/sheikh-abdullah-bin-jassim-al-thani?sc_lang=en":"الديوان الأميري · سيرة الشيخ عبدالله بن جاسم آل ثاني",
"https://www.diwan.gov.qa/en/about-qatar/qatars-rulers/sheikh-ali-bin-abdullah-al-thani":"الديوان الأميري · سيرة الشيخ علي بن عبدالله آل ثاني",
"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/our-story/":"مكتب الاتصال الحكومي · رؤية قطر الوطنية 2030",
"https://www.gco.gov.qa/en/state-of-qatar/qatar-national-vision-2030/programs-projects/":"مكتب الاتصال الحكومي · برامج ومشاريع رؤية قطر الوطنية 2030",
"https://www.gco.gov.qa/en/state-of-qatar/leadership/prime-minister-and-minister-of-foreign-affairs/":"مكتب الاتصال الحكومي · السيرة الرسمية لرئيس مجلس الوزراء وزير الخارجية",
"https://www.ashghal.gov.qa/en/Projects/Pages/The-Expressway-Programme.aspx":"هيئة الأشغال العامة · برنامج الطرق السريعة",
"https://www.qatarenergy.qa/en/WhoWeAre/Pages/WhatIsLNG.aspx":"قطر للطاقة · الغاز الطبيعي المسال",
"https://www.mwani.com.qa/English/Ports/HamadPort/Pages/default.aspx":"مواني قطر · ميناء حمد",
"https://www.qatarairways.com/en-au/press-releases/2014/May/pressrelease_270514_hia_operations.html":"الخطوط الجوية القطرية · التشغيل الكامل لمطار حمد الدولي",
"https://www.lusail.com/services/lcac/lusail-master-plan/":"لوسيل · المخطط الرئيسي",
"https://www.lusail.com/the-city-of-a-lifetime/":"لوسيل · مدينة العمر",
"https://qfz.gov.qa/why_qfz/free-zones/":"هيئة المناطق الحرة في قطر · المناطق الحرة",
"https://qfz.gov.qa/authority/":"هيئة المناطق الحرة في قطر · نبذة عن الهيئة",
"https://qfz.gov.qa/_umm_alhoul/":"هيئة المناطق الحرة في قطر · أم الحول",
"https://qfz.gov.qa/ras-bufontas-4/":"هيئة المناطق الحرة في قطر · راس بوفنطاس",
"https://www.mcit.gov.qa/en/nda":"وزارة الاتصالات وتكنولوجيا المعلومات · الأجندة الرقمية 2030",
"https://www.mcit.gov.qa/en/artificial-intelligence-committee/":"وزارة الاتصالات وتكنولوجيا المعلومات · لجنة الذكاء الاصطناعي",
"https://www.mcit.gov.qa/-/media/mcit/documents/strategies/national_artificial_intelligence_strategy_for_qatar_2019_en.pdf":"وزارة الاتصالات وتكنولوجيا المعلومات · الاستراتيجية الوطنية للذكاء الاصطناعي 2019",
"https://www.mcit.gov.qa/en/news/he-the-minister-we-envision-fanar-as-high-accuracy-arabic-llm-capable-of-processing-and-understanding-natural-arabic":"وزارة الاتصالات وتكنولوجيا المعلومات · فنار في منتدى قطر الاقتصادي 2024",
"https://visitqatar.com/intl-en/plan-your-trip/getting-around/doha-metro":"زوروا قطر · دليل مترو الدوحة"
};

function cleanUrl(url:string){return url.endsWith("/")?url:url}
function publisher(url:string){
  const host=new URL(url).hostname.replace(/^www\./,"");
  const map:Record<string,[string,string]>={
    "diwan.gov.qa":["Amiri Diwan","الديوان الأميري"],
    "gco.gov.qa":["Government Communications Office","مكتب الاتصال الحكومي"],
    "ashghal.gov.qa":["Public Works Authority (Ashghal)","هيئة الأشغال العامة (أشغال)"],
    "qatarenergy.qa":["QatarEnergy","قطر للطاقة"],
    "mwani.com.qa":["Mwani Qatar","مواني قطر"],
    "qatarairways.com":["Qatar Airways","الخطوط الجوية القطرية"],
    "lusail.com":["Lusail","لوسيل"],
    "qfz.gov.qa":["Qatar Free Zones Authority","هيئة المناطق الحرة في قطر"],
    "mcit.gov.qa":["Ministry of Communications and Information Technology","وزارة الاتصالات وتكنولوجيا المعلومات"],
    "visitqatar.com":["Visit Qatar","زوروا قطر"]
  };
  return map[host]??[host,host];
}
function fallbackLabel(url:string){const [p]=publisher(url);return p+" · Official source"}
function idFor(url:string){let h=2166136261;for(let i=0;i<url.length;i++){h^=url.charCodeAt(i);h=Math.imul(h,16777619)}return "src-"+(h>>>0).toString(36)}

const entries=new Map<string,SourceRegistryEntry>();
function add(args:{url:string;label?:string;labelAr?:string;role:SourceRole;record:SourceRecordRef;sourceKind?:EvidenceMeta["sourceKind"];reviewedOn?:string;sensitivity?:EvidenceSensitivity}){
  if(!args.url||args.url.startsWith("/"))return;
  const url=cleanUrl(args.url);
  const [pub,pubAr]=publisher(url);
  const existing=entries.get(url)??{id:idFor(url),label:args.label??fallbackLabel(url),labelAr:args.labelAr??labelArByUrl[url]??args.label??fallbackLabel(url),url,publisher:pub,publisherAr:pubAr,roles:[],records:[],sourceKinds:[],reviewedOn:[],sensitivities:[],access:sourceHealthByUrl[url]??{checkedOn:"",nextCheckOn:"",status:"REVIEW_REQUIRED",note:"No source-access audit is recorded yet."}};
  if(args.label&&!existing.label)existing.label=args.label;
  if(args.labelAr)existing.labelAr=args.labelAr;
  if(!existing.roles.includes(args.role))existing.roles.push(args.role);
  if(!existing.records.some(r=>r.kind===args.record.kind&&r.id===args.record.id))existing.records.push(args.record);
  if(args.sourceKind&&!existing.sourceKinds.includes(args.sourceKind))existing.sourceKinds.push(args.sourceKind);
  if(args.reviewedOn&&!existing.reviewedOn.includes(args.reviewedOn))existing.reviewedOn.push(args.reviewedOn);
  if(args.sensitivity&&!existing.sensitivities.includes(args.sensitivity))existing.sensitivities.push(args.sensitivity);
  entries.set(url,existing);
}

for(const project of projects){
  const ar=projectsAr[project.slug];
  add({url:project.sourceUrl,label:project.sourceLabel,labelAr:ar?.sourceLabel,role:"PRIMARY_RECORD",record:{kind:"Project",id:project.slug,label:project.name,labelAr:ar?.name??project.name,href:"/projects/"+project.slug},sourceKind:project.evidence.sourceKind,reviewedOn:project.evidence.verifiedOn,sensitivity:project.evidence.sensitivity});
  for(const source of project.supportingSources??[]){
    const arSource=ar?.supportingSources?.[source.label];
    add({url:source.url,label:source.label,labelAr:arSource?.label,role:"SUPPORTING_RECORD",record:{kind:"Project",id:project.slug,label:project.name,labelAr:ar?.name??project.name,href:"/projects/"+project.slug},reviewedOn:project.evidence.verifiedOn,sensitivity:project.evidence.sensitivity});
  }
}
for(const person of leaders){
  const ar=leadershipAr[person.slug];
  add({url:person.sourceUrl,label:person.sourceLabel,labelAr:ar?.sourceLabel,role:"PRIMARY_RECORD",record:{kind:"Leadership",id:person.slug,label:person.name,labelAr:ar?.name??person.name,href:"/leadership/"+person.slug},sourceKind:person.evidence.sourceKind,reviewedOn:person.evidence.verifiedOn,sensitivity:person.evidence.sensitivity});
}
for(const edge of graphEdges){
  add({url:edge.sourceUrl,label:labelEnByUrl[edge.sourceUrl]??(labelArByUrl[edge.sourceUrl]?undefined:fallbackLabel(edge.sourceUrl)),labelAr:labelArByUrl[edge.sourceUrl],role:"RELATIONSHIP_EVIDENCE",record:{kind:"Connection",id:edge.id,label:edge.label,labelAr:connectionEdgeAr[edge.id]?.label??edge.label,href:"/connections"},sourceKind:edge.evidenceMeta.sourceKind,reviewedOn:edge.evidenceMeta.verifiedOn,sensitivity:edge.evidenceMeta.sensitivity});
}
for(const item of [...rulerPeriods,...historicalMilestones]){
  add({url:item.sourceUrl,label:item.sourceLabel,labelAr:labelArByUrl[item.sourceUrl],role:"TIMELINE_EVIDENCE",record:{kind:"Timeline",id:item.year+"-"+item.title,label:item.title,labelAr:(rulerAr[item.year]?.[0]??milestoneAr[item.year]?.[0]??item.title),href:"/timeline"}});
}
for(const item of mapRecords){
  add({url:item.sourceUrl,label:item.sourceLabel,labelAr:labelArByUrl[item.sourceUrl],role:"GEOGRAPHIC_EVIDENCE",record:{kind:"Map",id:item.id,label:item.name,labelAr:mapRecordAr[item.id]?.name??item.name,href:"/map"}});
}

export const sourceRegistry=[...entries.values()].sort((a,b)=>a.publisher.localeCompare(b.publisher)||a.label.localeCompare(b.label));
export const sourceRegistryStats={
  sources:sourceRegistry.length,
  publishers:new Set(sourceRegistry.map(x=>x.publisher)).size,
  linkedRecords:sourceRegistry.reduce((sum,x)=>sum+x.records.length,0),
  reviewedSources:sourceRegistry.filter(x=>x.reviewedOn.length>0).length,
  accessAuditedSources:sourceRegistry.filter(x=>x.access.checkedOn).length,
  reviewRequiredSources:sourceRegistry.filter(x=>x.access.status==="REVIEW_REQUIRED").length
};
