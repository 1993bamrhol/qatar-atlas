const fs=require("fs");
const files={projects:fs.readFileSync("data/projects.ts","utf8"),leadership:fs.readFileSync("data/leadership.ts","utf8"),connections:fs.readFileSync("data/connections.ts","utf8")};
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
if(errors.length){console.error("Evidence integrity audit failed:\n"+errors.join("\n"));process.exit(1)}
console.log("Evidence integrity audit passed: 10 projects, 3 leaders, 11 relationships.");
