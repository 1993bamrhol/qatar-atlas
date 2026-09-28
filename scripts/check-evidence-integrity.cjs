const fs=require("fs");
const files={projects:fs.readFileSync("data/projects.ts","utf8"),leadership:fs.readFileSync("data/leadership.ts","utf8"),connections:fs.readFileSync("data/connections.ts","utf8"),timeline:fs.readFileSync("data/timeline.ts","utf8"),map:fs.readFileSync("data/map.ts","utf8")};
const errors=[];
const allowedKinds=new Set(["PRIMARY_OFFICIAL","SECONDARY_OFFICIAL","PUBLIC_REFERENCE"]);
const allowedSensitivity=new Set(["STABLE","TIME_SENSITIVE","TARGET","HISTORICAL"]);
const iso=/^\d{4}-\d{2}-\d{2}$/;
function audit(name,text,expected,marker){
  const records=[...text.matchAll(/evidence(?:Meta)?:\{sourceKind:"([^"]+)",verifiedOn:"([^"]+)",sensitivity:"([^"]+)"(?:,note:"[^"]*")?\}/g)];
  if(records.length!==expected)errors.push(name+": expected "+expected+" evidence records; found "+records.length);
  records.forEach((m,i)=>{
    if(!allowedKinds.has(m[1]))errors.push(name+" #"+(i+1)+": invalid sourceKind "+m[1]);
    if(!iso.test(m[2]))errors.push(name+" #"+(i+1)+": verifiedOn must use YYYY-MM-DD");
    if(!allowedSensitivity.has(m[3]))errors.push(name+" #"+(i+1)+": invalid sensitivity "+m[3]);
  });
  const count=(text.match(marker)||[]).length;
  if(count!==expected)errors.push(name+": expected "+expected+" domain records; found "+count);
}
audit("projects",files.projects,10,/slug:"/g);
audit("leadership",files.leadership,3,/slug:"/g);
audit("connections",files.connections,11,/\{id:"e\d+"/g);
if(!files.connections.includes('id:"e1"')||!files.connections.includes('sensitivity:"HISTORICAL"'))errors.push("connections: historical planning evidence classification missing");
for(const id of ["e3","e9","e10","e11"]){
  const start=files.connections.indexOf('{id:"'+id+'"'),end=files.connections.indexOf("\n",start);
  if(start<0||!files.connections.slice(start,end<0?undefined:end).includes('sensitivity:"STABLE"'))errors.push("connections: "+id+" must remain STABLE");
}
function lineForId(text,id){return text.split("\n").find(line=>line.startsWith('{id:"'+id+'"'))??"";}
function auditReviewMeta(name,text,expectedEvidence,expectedRecords,marker){
  const records=[...text.matchAll(/evidence:\{sourceKind:"([^"]+)",(?:reviewedOn:"([^"]+)",)?sensitivity:"([^"]+)"(?:,note:"[^"]*")?\}/g)];
  if(records.length!==expectedEvidence)errors.push(name+": expected "+expectedEvidence+" review metadata records; found "+records.length);
  records.forEach((m,i)=>{
    if(!allowedKinds.has(m[1]))errors.push(name+" #"+(i+1)+": invalid sourceKind "+m[1]);
    if(m[2]&&!iso.test(m[2]))errors.push(name+" #"+(i+1)+": reviewedOn must use YYYY-MM-DD");
    if(!allowedSensitivity.has(m[3]))errors.push(name+" #"+(i+1)+": invalid sensitivity "+m[3]);
  });
  const count=(text.match(marker)||[]).length;
  if(count!==expectedRecords)errors.push(name+": expected "+expectedRecords+" domain records; found "+count);
  return records;
}
const timelineReview=auditReviewMeta("timeline",files.timeline,15,15,/\{id:"(?:ruler|milestone)-/g);
if(timelineReview.filter(x=>x[2]==="2026-09-28").length!==15)errors.push("timeline: all 15 approved records must use reviewedOn 2026-09-28");
if(timelineReview.filter(x=>x[1]==="PRIMARY_OFFICIAL").length!==15)errors.push("timeline: all 15 records must remain PRIMARY_OFFICIAL");
if(timelineReview.filter(x=>x[3]==="HISTORICAL").length!==14||timelineReview.filter(x=>x[3]==="TIME_SENSITIVE").length!==1)errors.push("timeline: expected 14 HISTORICAL and 1 TIME_SENSITIVE record");
const tamim=lineForId(files.timeline,"ruler-tamim-bin-hamad-al-thani-2013");
if(!tamim.includes('sensitivity:"TIME_SENSITIVE"'))errors.push("timeline: current Amir ruler record must remain TIME_SENSITIVE");
const mapReview=auditReviewMeta("map",files.map,5,6,/\{id:"(?:doha|lusail|hamad-port|hia|umm-al-houl|ras-bufontas)"/g);
if(mapReview.filter(x=>x[1]==="PRIMARY_OFFICIAL").length!==5)errors.push("map: five external evidence records must remain PRIMARY_OFFICIAL");
if(mapReview.filter(x=>x[3]==="STABLE").length!==5)errors.push("map: five external evidence records must remain STABLE");
if(mapReview.filter(x=>x[2]==="2026-09-28").length!==4)errors.push("map: exactly four records must use reviewedOn 2026-09-28");
const hia=lineForId(files.map,"hia");
if(!hia.includes('sourceKind:"PRIMARY_OFFICIAL"')||!hia.includes('sensitivity:"STABLE"')||hia.includes("reviewedOn:"))errors.push("map: hia must keep sourceKind/sensitivity but reviewedOn UNSET");
const doha=lineForId(files.map,"doha");
if(doha.includes("evidence:"))errors.push("map: doha evidence metadata must remain UNSET");
if((files.map.match(/geoStatus:"AREA_VERIFIED"/g)||[]).length!==6)errors.push("map: evidence metadata must not change current AREA_VERIFIED states");
if((files.map.match(/publicPin:false/g)||[]).length!==6)errors.push("map: evidence metadata must not enable public pins");
if(errors.length){console.error("Evidence integrity audit failed:\n"+errors.join("\n"));process.exit(1)}
console.log("Evidence integrity audit passed: projects, leadership, relationships, 15 timeline records and 6 map records.");
