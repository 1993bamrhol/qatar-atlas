import {chromium} from "playwright";
import fs from "node:fs";

const base=process.env.RC_BASE_URL||"http://127.0.0.1:3000";
const outDir=process.env.RC_SCREENSHOT_DIR||"artifacts/rc-visual";
fs.mkdirSync(outDir,{recursive:true});

const modes=[
  {name:"desktop-en",locale:"en",dir:"ltr",viewport:{width:1440,height:900},mobile:false},
  {name:"desktop-ar",locale:"ar",dir:"rtl",viewport:{width:1440,height:900},mobile:false},
  {name:"mobile-en",locale:"en",dir:"ltr",viewport:{width:390,height:844},mobile:true},
  {name:"mobile-ar",locale:"ar",dir:"rtl",viewport:{width:390,height:844},mobile:true},
];

const detailLeader="tamim-bin-hamad-al-thani";
const detailProject="north-field-expansion";
const routes=["","/leadership",`/leadership/${detailLeader}`,"/projects",`/projects/${detailProject}`,"/timeline","/connections","/map","/methodology","/sources"];
const screenshotRoutes=[["home",""],["connections","/connections"],["sources","/sources"]];
const errors=[];

function fail(mode,route,message){errors.push(`${mode} ${route||"/"}: ${message}`)}

const browser=await chromium.launch({headless:true});
try{
  for(const mode of modes){
    const context=await browser.newContext({viewport:mode.viewport,deviceScaleFactor:1,isMobile:mode.mobile});
    const page=await context.newPage();
    let currentPath="";
    page.on("pageerror",err=>fail(mode.name,currentPath||"[pageerror]",err.message));
    page.on("console",msg=>{if(msg.type()==="error"&&!/Failed to load resource: the server responded with a status of 404/i.test(msg.text())) fail(mode.name,currentPath||"[console]",msg.text())});
    page.on("response",response=>{const status=response.status();if(status<400)return;const resourceType=response.request().resourceType();const url=response.url();const expectedDocument404=resourceType==="document"&&url.includes("/release-candidate-missing-route");if(!expectedDocument404)fail(mode.name,currentPath||"[response]",`${resourceType} HTTP ${status} · ${url}`)});

    for(const route of routes){
      const path=`/${mode.locale}${route}`;
      currentPath=path;
      const response=await page.goto(base+path,{waitUntil:"networkidle",timeout:30000});
      if(!response){fail(mode.name,path,"no navigation response");continue}
      if(response.status()>=400) fail(mode.name,path,`unexpected HTTP ${response.status()}`);

      const state=await page.evaluate(()=>{
        const html=document.documentElement;
        const bodyText=document.body.innerText;
        const main=document.querySelector("#main-content");
        return {
          lang:html.lang,
          dir:html.dir,
          overflow:html.scrollWidth-html.clientWidth,
          hasMain:Boolean(main),
          rightsPlaceholder:/RIGHTS REVIEW|قيد مراجعة الحقوق/.test(bodyText),
        };
      });
      if(state.lang!==mode.locale) fail(mode.name,path,`html lang=${state.lang}, expected ${mode.locale}`);
      if(state.dir!==mode.dir) fail(mode.name,path,`html dir=${state.dir}, expected ${mode.dir}`);
      if(state.overflow>2) fail(mode.name,path,`horizontal overflow ${state.overflow}px`);
      if(!state.hasMain) fail(mode.name,path,"missing #main-content");
      if(state.rightsPlaceholder) fail(mode.name,path,"temporary portrait-rights placeholder is visible");
    }

    // Language switch must preserve the current route.
    currentPath=`/${mode.locale}/sources`;
    await page.goto(base+currentPath,{waitUntil:"networkidle"});
    const switchHref=await page.locator(".qa-language a").getAttribute("href");
    const other=mode.locale==="en"?"ar":"en";
    if(switchHref!==`/${other}/sources`) fail(mode.name,"/sources",`language switch href=${switchHref}`);

    // Core interactive surfaces.
    if(await page.locator(".qa-source-toolbar").count()!==1) fail(mode.name,"/sources","source toolbar missing");
    if(await page.locator(".qa-source-list .qa-source-card").count()<20) fail(mode.name,"/sources","source registry rendered fewer than 20 source cards");

    currentPath=`/${mode.locale}/connections`;
    await page.goto(base+currentPath,{waitUntil:"networkidle"});
    if(await page.locator(".qa-graph-canvas").count()!==1) fail(mode.name,"/connections","graph canvas missing");
    if(await page.locator(".qa-connections-controls input").count()!==1) fail(mode.name,"/connections","connections search missing");

    if(mode.mobile){
      currentPath=`/${mode.locale}`;
      await page.goto(base+currentPath,{waitUntil:"networkidle"});
      const toggle=page.locator(".qa-menu-toggle");
      if(!(await toggle.isVisible())) fail(mode.name,"/","mobile menu toggle not visible");
      else{
        await toggle.click();
        const nav=page.locator("#qa-primary-nav");
        if(!(await nav.isVisible())) fail(mode.name,"/","mobile navigation did not open");
        const expanded=await toggle.getAttribute("aria-expanded");
        if(expanded!=="true") fail(mode.name,"/","mobile menu aria-expanded did not update");
        await toggle.click();
      }
    }

    // Expected 404.
    currentPath=`/${mode.locale}/release-candidate-missing-route`;
    const missing=await page.goto(base+currentPath,{waitUntil:"networkidle"});
    if(!missing||missing.status()!==404) fail(mode.name,"/404",`expected HTTP 404, got ${missing?.status()??"none"}`);

    // Release evidence screenshots.
    for(const [label,route] of screenshotRoutes){
      currentPath=`/${mode.locale}${route}`;
      await page.goto(base+currentPath,{waitUntil:"networkidle"});
      await page.screenshot({path:`${outDir}/${mode.name}-${label}.png`,fullPage:true});
    }

    await context.close();
  }
}finally{
  await browser.close();
}

const report={
  base,
  generatedAt:new Date().toISOString(),
  modes:modes.map(x=>({name:x.name,viewport:x.viewport})),
  screenshots:fs.readdirSync(outDir).filter(x=>x.endsWith(".png")).sort(),
  errors,
};
fs.writeFileSync(`${outDir}/report.json`,JSON.stringify(report,null,2));

if(errors.length){
  console.error("RC browser/device QA failed:\n"+errors.map(x=>" - "+x).join("\n"));
  process.exit(1);
}
console.log(`RC browser/device QA passed: ${modes.length} modes, ${routes.length} critical routes each, ${report.screenshots.length} screenshots captured.`);
