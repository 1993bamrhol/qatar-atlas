const fs=require("fs");
const read=p=>fs.readFileSync(p,"utf8");
const errors=[];
function assert(condition,message){if(!condition)errors.push(message)}
function hasKey(text,key){return text.includes('"'+key+'":')||text.includes(key+':');}
function recordChunk(text,marker,nextMarker){
  const start=text.indexOf(marker);
  if(start<0)return "";
  const end=text.indexOf(nextMarker,start+marker.length);
  return text.slice(start,end<0?undefined:end);
}
function values(text,re){return [...text.matchAll(re)].map(m=>m[1]);}
function assertNestedParity(enChunk,arChunk,kind,id){
  const groups=[
    ["relationship",values(enChunk,/\{label:"([^"]+)",type:"/g)],
    ["milestone",values(enChunk,/\{date:"([^"]+)",title:"/g)],
    ["fact",values(enChunk,/\{label:"([^"]+)",value:"/g)],
    ["supporting source",values(enChunk,/\{label:"([^"]+)",url:"https:\/\//g)]
  ];
  const places=enChunk.match(/places:\[([^\]]*)\]/)?.[1];
  if(places)groups.push(["place",values(places,/"([^"]+)"/g)]);
  for(const [label,keys] of groups)for(const key of keys)assert(hasKey(arChunk,key),"Missing Arabic "+kind+" "+label+" key for "+id+": "+key);
}
const leadership=read("data/leadership.ts");
const leadershipAr=read("data/leadership-ar.ts");
const projects=read("data/projects.ts");
const projectsAr=read("data/projects-ar.ts");
const connections=read("data/connections.ts");
const connectionsAr=read("data/connections-ar.ts");
const map=read("data/map.ts");
const mapAr=read("data/map-ar.ts");
const timeline=read("data/timeline.ts");
const timelineAr=read("data/timeline-ar.ts");
const leaderSlugs=[...leadership.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
const projectSlugs=[...projects.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
const nodeSection=connections.slice(connections.indexOf("graphNodes"),connections.indexOf("graphEdges"));
const edgeSection=connections.slice(connections.indexOf("graphEdges"));
const nodeIds=[...nodeSection.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
const edgeIds=[...edgeSection.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
const mapIds=[...map.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
const rulerSection=timeline.slice(timeline.indexOf("rulerPeriods"),timeline.indexOf("historicalMilestones"));
const milestoneSection=timeline.slice(timeline.indexOf("historicalMilestones"));
const rulerIds=[...rulerSection.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
const milestoneIds=[...milestoneSection.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]);
assert(leaderSlugs.length===3,"Expected 3 canonical leadership records");
leaderSlugs.forEach(x=>assert(hasKey(leadershipAr,x),"Missing Arabic leadership record: "+x));
assert(projectSlugs.length===10,"Expected 10 canonical project records");
projectSlugs.forEach(x=>assert(hasKey(projectsAr,x),"Missing Arabic project record: "+x));
assert(nodeIds.length===14,"Expected 14 connection nodes");
nodeIds.forEach(x=>assert(hasKey(connectionsAr,x),"Missing Arabic connection node: "+x));
assert(edgeIds.length===11,"Expected 11 connection edges");
edgeIds.forEach(x=>assert(hasKey(connectionsAr,x),"Missing Arabic connection edge: "+x));
assert(mapIds.length===6,"Expected 6 map records");
mapIds.forEach(x=>assert(hasKey(mapAr,x),"Missing Arabic map record: "+x));
assert(rulerIds.length===8,"Expected 8 ruler periods");
rulerIds.forEach(x=>assert(hasKey(timelineAr,x),"Missing Arabic ruler timeline entry: "+x));
assert(milestoneIds.length===7,"Expected 7 historical milestones");
milestoneIds.forEach(x=>assert(hasKey(timelineAr,x),"Missing Arabic milestone entry: "+x));
assert(new Set([...rulerIds,...milestoneIds]).size===rulerIds.length+milestoneIds.length,"Timeline IDs must be globally unique across ruler periods and milestones");
assert(!timelineAr.includes('"1949":['),"Timeline Arabic keys must use stable IDs, not ambiguous year keys");
for(const slug of projectSlugs){
  const enChunk=recordChunk(projects,'{slug:"'+slug+'"','},{slug:"');
  const arChunk=recordChunk(projectsAr,'"'+slug+'":{','\n"');
  assertNestedParity(enChunk,arChunk,"project",slug);
}
for(const slug of leaderSlugs){
  const enChunk=recordChunk(leadership,'{slug:"'+slug+'"','\n{slug:"');
  const arChunk=recordChunk(leadershipAr,'"'+slug+'":{','\n"');
  assertNestedParity(enChunk,arChunk,"leadership",slug);
}
const badgeFiles=["app/[locale]/leadership/page.tsx","app/[locale]/projects/page.tsx","app/[locale]/leadership/[slug]/page.tsx","app/[locale]/projects/[slug]/page.tsx","app/[locale]/methodology/page.tsx","components/home/hero.tsx","components/home/leadership-preview.tsx","components/home/projects-preview.tsx","components/home/connections-preview.tsx","components/connections/connections-explorer.tsx"];
for(const path of badgeFiles){const text=read(path);for(const tag of ["VerificationBadge","RelationshipBadge"]){const chunks=text.split("<"+tag).slice(1);for(const chunk of chunks){const end=chunk.indexOf("/>");if(end<0)continue;const badge=chunk.slice(0,end);assert(badge.includes("locale="),path+" has a user-visible "+tag+" without locale");}}}
const userVisibleFiles=[...badgeFiles,"app/[locale]/connections/page.tsx","app/[locale]/map/page.tsx","components/home/map-preview.tsx","components/map/map-explorer.tsx"];
const joined=userVisibleFiles.map(read).join("\\n");
for(const token of ["حتى تحقق PIN VERIFIED","آخر تحقق:","<h2>STABLE · TIME SENSITIVE · TARGET · HISTORICAL</h2>"]){assert(!joined.includes(token),"Legacy English/verification copy remains: "+token);}
if(errors.length){console.error("Arabic completeness audit failed:\\n"+errors.join("\\n"));process.exit(1)}
console.log("Arabic completeness audit passed: leadership, projects, timeline, connections, map and localized badges covered.");