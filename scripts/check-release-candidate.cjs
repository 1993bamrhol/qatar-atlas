const fs=require("fs");

const path="docs/release-candidate.md";
if(!fs.existsSync(path)){
  console.error("Release candidate gate missing: "+path);
  process.exit(1);
}
const text=fs.readFileSync(path,"utf8");
const errors=[];

const required=[
  "Four presentation modes",
  "EN + AR",
  "Desktop + Mobile",
  "Desktop · English",
  "Desktop · Arabic",
  "Mobile · English",
  "Mobile · Arabic",
  "Production rule",
  "npm run check:rc",
  "Pre-Merge Certification",
  "Final Pre-Merge Gate",
  "Post-Merge Smoke QA",
  "Post-Release Control",
  "main → develop",
  "lineage synchronization",
  "tested SHA",
  "approved SHA",
  "SHA drift",
  "no force push",
  "no reset",
  "no history rewrite"
];
for(const token of required){
  if(!text.includes(token)) errors.push("RC gate missing durable governance contract: "+token);
}

const legacyPatterns=[
  {pattern:/PR #\d+/i,label:"specific PR number"},
  {pattern:/Frozen release baseline/i,label:"frozen release snapshot"},
  {pattern:/\b[0-9a-f]{40}\b/i,label:"specific commit SHA"},
  {pattern:/\bdpl_[A-Za-z0-9]+\b/,label:"deployment ID"},
  {pattern:/Artifact ID\s*[:#]?\s*\d+/i,label:"artifact ID"},
  {pattern:/PASS\s*—\s*\d{4}-\d{2}-\d{2}/i,label:"dated PASS snapshot"}
];
for(const {pattern,label} of legacyPatterns){
  if(pattern.test(text)) errors.push("RC gate must remain evergreen; found "+label+".");
}

if(errors.length){
  console.error("Release candidate gate failed:\n"+errors.join("\n"));
  process.exit(1);
}

console.log("Release candidate gate passed: evergreen release governance contract is present.");
