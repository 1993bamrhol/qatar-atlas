const fs=require("fs");

const logPath="build-output.log";
if(!fs.existsSync(logPath)){
  console.error("Performance budget audit failed: build-output.log not found.");
  process.exit(1);
}
const text=fs.readFileSync(logPath,"utf8").replace(/[[0-9;]*m/g,"");
const errors=[];

const shared=text.match(/First Load JS shared by all\s+([0-9.]+) kB/);
if(!shared){
  errors.push("Could not read shared First Load JS from build output.");
}else if(Number(shared[1])>130){
  errors.push("Shared First Load JS exceeds 130 kB: "+shared[1]+" kB");
}

const routeMatches=[...text.matchAll(/^.*?\/[[]locale\][^\n]*?([0-9.]+) kB\s*$/gm)];
if(!routeMatches.length){
  errors.push("Could not read localized route First Load JS values.");
}else{
  const values=routeMatches.map(m=>Number(m[1])).filter(Number.isFinite);
  const max=Math.max(...values);
  if(max>160)errors.push("Localized route First Load JS exceeds 160 kB: "+max+" kB");
}

if(errors.length){
  console.error("Performance budget audit failed:\n"+errors.join("\n"));
  process.exit(1);
}
console.log("Performance budget audit passed: shared <= 130 kB and localized routes <= 160 kB First Load JS.");
