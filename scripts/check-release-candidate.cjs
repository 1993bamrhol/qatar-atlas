const fs=require("fs");

const path="docs/release-candidate.md";
if(!fs.existsSync(path)){
  console.error("Release candidate gate missing: "+path);
  process.exit(1);
}
const text=fs.readFileSync(path,"utf8");
const errors=[];

const required=[
  "Desktop · English",
  "Desktop · Arabic",
  "Mobile · English",
  "Mobile · Arabic",
  "Production rule",
  "Do **not** mark PR #1 ready",
  "npm run check:rc"
];
for(const token of required) if(!text.includes(token)) errors.push("RC gate missing required contract: "+token);

if(/\|\s*(Desktop|Mobile)\s*·\s*(English|Arabic)\s*\|[^\n]*\|\s*FAIL\b/i.test(text)){
  errors.push("At least one manual device mode is FAIL.");
}
const pending=[...text.matchAll(/\|\s*(Desktop|Mobile)\s*·\s*(English|Arabic)\s*\|[^\n]*\|\s*PENDING\s*\|/g)]
  .map(m=>m[1]+" · "+m[2]);

if(errors.length){
  console.error("Release candidate gate failed:\n"+errors.join("\n"));
  process.exit(1);
}
if(pending.length){
  console.error("Release candidate is not merge-ready. Manual device QA still pending:\n- "+pending.join("\n- "));
  process.exit(2);
}
const passCount=[...text.matchAll(/\|\s*(Desktop|Mobile)\s*·\s*(English|Arabic)\s*\|[^\n]*\|\s*PASS\s*—\s*\d{4}-\d{2}-\d{2}\s*\|/g)].length;
if(passCount!==4){
  console.error("Release candidate requires four dated PASS results; found "+passCount+".");
  process.exit(1);
}
console.log("Release candidate gate passed: all four manual device modes are dated PASS.");
