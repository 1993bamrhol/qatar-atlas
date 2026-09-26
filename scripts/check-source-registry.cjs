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
assert(external.size>=20,"Expected at least 20 unique external evidence URLs, found "+external.size);
for(const url of external)assert(url.startsWith("https://"),"Registry source must use HTTPS: "+url);

const registry=read("data/source-registry.ts");
for(const token of [
  'from "@/data/projects"',
  'from "@/data/leadership"',
  'from "@/data/connections"',
  'from "@/data/map"',
  'from "@/data/timeline"',
  'for(const project of projects)',
  'for(const person of leaders)',
  'for(const edge of graphEdges)',
  'for(const item of [...rulerPeriods,...historicalMilestones])',
  'for(const item of mapRecords)'
])assert(registry.includes(token),"Source registry builder missing canonical coverage contract: "+token);
assert(registry.includes('if(!args.url||args.url.startsWith("/"))return;'),"Internal methodology links must not be treated as external evidence sources");

const page=read("app/[locale]/sources/page.tsx");
for(const token of ["SourceRegistryExplorer","sourceRegistryStats","Record review date is not source publication date","تاريخ مراجعة السجل ليس تاريخ نشر المصدر"])
  assert(page.includes(token),"Source registry page missing provenance disclosure: "+token);

const nav=read("lib/constants.ts");
assert(nav.includes('"sources"'),"Primary navigation must expose source registry");
const sitemap=read("app/sitemap.ts");
assert(sitemap.includes('"sources"'),"Sitemap must include source registry");

if(errors.length){
  console.error("Source registry audit failed:\n"+errors.join("\n"));
  process.exit(1);
}
console.log("Source registry audit passed: "+external.size+" unique external evidence URLs are covered by the computed registry architecture.");
