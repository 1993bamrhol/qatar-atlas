const fs=require("fs");
const read=p=>fs.readFileSync(p,"utf8");
const errors=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};
const pages=["app/[locale]/page.tsx","app/[locale]/leadership/page.tsx","app/[locale]/projects/page.tsx","app/[locale]/timeline/page.tsx","app/[locale]/connections/page.tsx","app/[locale]/map/page.tsx","app/[locale]/methodology/page.tsx","app/[locale]/sources/page.tsx","app/[locale]/projects/[slug]/page.tsx","app/[locale]/leadership/[slug]/page.tsx"];
for(const path of pages){const t=read(path);assert(t.includes('id="main-content"'),path+" missing main-content target");assert(t.includes("tabIndex={-1}"),path+" main target must be programmatically focusable");}
const header=read("components/layout/locale-header.tsx");
for(const token of ['className="qa-skip-link"',"aria-expanded={open}",'aria-controls="qa-primary-nav"',"aria-current={active",'aria-label={menuLabel}'])assert(header.includes(token),"LocaleHeader missing accessibility contract: "+token);
const map=read("components/map/map-explorer.tsx");
const graph=read("components/connections/connections-explorer.tsx");
const sources=read("components/sources/source-registry-explorer.tsx");
assert(map.includes('type="button"'),"Map markers/filters require explicit button type");
assert(graph.includes('aria-label={ar?"البحث في روابط قطر"'),"Connections search requires localized aria-label");
assert(sources.includes('aria-label={ar?"البحث في سجل المصادر"'),"Source registry search requires localized aria-label");
assert(sources.includes('aria-pressed={role===r}'),"Source registry filters require aria-pressed state");
const css=read("app/globals.css");
for(const token of [".qa-menu-toggle","a:focus-visible","button:focus-visible","@media(prefers-reduced-motion:reduce)",".qa-skip-link",".qa-nav nav.is-open","min-height:44px"])assert(css.includes(token),"globals.css missing responsive/a11y rule: "+token);
if(errors.length){console.error("Accessibility/responsive audit failed:\n"+errors.join("\n"));process.exit(1)}
console.log("Accessibility/responsive audit passed: landmarks, mobile nav, focus, targets and reduced motion contracts present.");