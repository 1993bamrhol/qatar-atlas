const fs=require("fs");
const read=p=>fs.readFileSync(p,"utf8");
const errors=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};
const map=read("data/map.ts");
const projects=read("data/projects.ts");
const projectsAr=read("data/projects-ar.ts");
const leadership=read("data/leadership.ts");
const connections=read("data/connections.ts");
const sitemap=read("app/sitemap.ts");
const notFound=read("app/not-found.tsx");
const readme=read("README.md");
for(const line of map.split("\n").filter(x=>x.includes('{id:"'))){const id=line.match(/id:"([^"]+)"/)?.[1]||"unknown";const publicPin=line.includes("publicPin:true");const pinVerified=line.includes('geoStatus:"PIN_VERIFIED"');assert(!publicPin||pinVerified,"Map record "+id+" exposes a public pin without PIN_VERIFIED");}
for(const token of ["latitude:","longitude:","lat:","lng:"]){assert(!map.includes(token),"Map data must not introduce precise coordinate field without a dedicated verification model: "+token);}
for(const [name,text] of [["projects",projects],["leadership",leadership],["connections",connections]]){assert(!text.includes('sourceUrl:"http://'),name+" contains insecure source URL");const urls=[...text.matchAll(/(?:sourceUrl|url):"([^"]+)"/g)].map(m=>m[1]);urls.filter(u=>!u.startsWith("/")).forEach(u=>assert(u.startsWith("https://"),name+" contains non-HTTPS external source: "+u));}
const nodeSection=connections.slice(connections.indexOf("graphNodes"),connections.indexOf("graphEdges"));
const edgeSection=connections.slice(connections.indexOf("graphEdges"));
const nodeIds=new Set([...nodeSection.matchAll(/id:"([^"]+)"/g)].map(m=>m[1]));
for(const edge of edgeSection.split("\n").filter(x=>x.includes('{id:"e'))){const id=edge.match(/id:"([^"]+)"/)?.[1]||"unknown";const from=edge.match(/from:"([^"]+)"/)?.[1];const to=edge.match(/to:"([^"]+)"/)?.[1];assert(from&&nodeIds.has(from),"Connection "+id+" references missing from-node "+from);assert(to&&nodeIds.has(to),"Connection "+id+" references missing to-node "+to);}
assert(projects.includes("Visit Qatar · Doha Metro Guide"),"Doha Metro supporting source is missing");
assert(projects.includes("Qatar Free Zones Authority · The Authority"),"QFZ creation supporting source is missing");
assert(projects.includes("National Artificial Intelligence Strategy for Qatar 2019"),"National AI strategy supporting source is missing");
assert(projects.includes("MCIT · Fanar at Qatar Economic Forum 2024"),"Fanar supporting source is missing");
for(const label of ["Visit Qatar · Doha Metro Guide","Qatar Free Zones Authority · The Authority","MCIT · National Artificial Intelligence Strategy for Qatar 2019","MCIT · Fanar at Qatar Economic Forum 2024"]){assert(projectsAr.includes('"'+label+'":{label:'),"Arabic supporting source translation missing: "+label);}
assert(sitemap.includes("NEXT_PUBLIC_SITE_URL"),"Sitemap must support explicit production domain");
assert(sitemap.includes("VERCEL_PROJECT_PRODUCTION_URL"),"Sitemap must support Vercel production domain");
assert(sitemap.includes("if(!base)return []"),"Sitemap must not invent a production domain");
assert(notFound.includes("404 · غير موجود"),"Bilingual not-found page missing");
assert(readme.includes("Do not publish precise map pins unless the record is `PIN_VERIFIED`"),"Production map safety guidance missing");
assert(readme.includes("Do not replace official-image placeholders until usage rights have been reviewed"),"Media rights release guidance missing");
if(errors.length){console.error("Production data safety audit failed:\n"+errors.join("\n"));process.exit(1)}
console.log("Production data safety audit passed: source URLs, graph references, geographic gating, supporting sources and release safeguards enforced.");