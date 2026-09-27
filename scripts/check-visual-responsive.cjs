const fs=require("fs");
const css=fs.readFileSync("app/globals.css","utf8");
const errors=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};
for(const token of [".qa-timeline-toolbar,.qa-connections-toolbar,.qa-map-toolbar{top:86px}","@media(max-width:800px){","top:68px",".qa-hero-ar{max-width:100%;width:auto;overflow-wrap:anywhere}",".qa-timeline-grid{grid-template-columns:repeat(3,minmax(0,1fr))}","inset-inline-start:80px","border-inline-start:1px solid var(--line)","border-inline-end:1px solid #40383A"])assert(css.includes(token),"Missing visual QA contract: "+token);
assert(css.includes("@media(max-width:600px){\n  .qa-timeline-grid{grid-template-columns:1fr}"),"Timeline cards must collapse to one column on small screens");
assert(css.includes("@media(max-width:480px){\n  .qa-keyfact-grid>div{border-inline-end:0}"),"Key facts borders must clear on narrow screens");
assert(css.includes(".qa-source-meta>div:nth-child(even){border-inline-end:0}"),"Source metadata tablet grid must clear end borders on every second cell");
assert(css.includes(".qa-source-meta>div:nth-child(-n+4){border-bottom:1px solid var(--line)}"),"Source metadata six-field tablet grid must preserve row separators");
if(errors.length){console.error("Visual responsive audit failed:\n"+errors.join("\n"));process.exit(1)}
const leadershipFiles=["components/home/leadership-preview.tsx","app/[locale]/leadership/page.tsx","app/[locale]/leadership/[slug]/page.tsx"].map(p=>fs.readFileSync(p,"utf8")).join("\n");
assert(!/RIGHTS REVIEW|قيد مراجعة الحقوق/.test(leadershipFiles),"Release UI must not expose temporary portrait-rights placeholders");
assert(leadershipFiles.includes("qa-identity-panel")&&leadershipFiles.includes("qa-profile-identity"),"Leadership release UI must use intentional neutral identity panels");
assert(css.includes(".qa-identity-panel,.qa-profile-identity"),"Neutral identity panels require release styling");
console.log("Visual responsive audit passed: sticky offsets, RTL logical properties, hero wrapping, mobile grids and leadership identity panels enforced.");