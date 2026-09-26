const fs=require("fs");
const text=fs.readFileSync("next.config.ts","utf8");
const errors=[];
const assert=(ok,msg)=>{if(!ok)errors.push(msg)};
for(const token of ['poweredByHeader:false','compress:true','X-Content-Type-Options','nosniff','X-Frame-Options','DENY','Referrer-Policy','strict-origin-when-cross-origin','Permissions-Policy','camera=(), microphone=(), geolocation=()','Cross-Origin-Opener-Policy','same-origin'])assert(text.includes(token),"Missing production security setting: "+token);
assert(!text.includes("unsafe-eval"),"Production config must not opt into unsafe-eval");
if(errors.length){console.error("Production security audit failed:\n"+errors.join("\n"));process.exit(1)}
console.log("Production security audit passed: disclosure, framing, MIME, referrer, permissions and opener policies enforced.");