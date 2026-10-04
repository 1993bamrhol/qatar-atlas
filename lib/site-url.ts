import type {Metadata} from "next";
import type {Locale} from "@/types";

export function siteBase(){
  const explicit=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,"");
  if(explicit)return explicit;
  const vercel=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
  return vercel?`https://${vercel.replace(/\/$/,"")}`:"";
}

export function absoluteSiteUrl(path:string){
  const base=siteBase();
  if(!base)return undefined;
  const normalized=path.startsWith("/")?path:`/${path}`;
  return `${base}${normalized}`;
}

export function localizedPageMetadata({locale,path,title,description,absoluteTitle=false}:{locale:Locale;path:string;title:string;description:string;absoluteTitle?:boolean}):Metadata{
  const suffix=path?path.startsWith("/")?path:`/${path}`:"";
  const canonical=absoluteSiteUrl(`/${locale}${suffix}`);
  const en=absoluteSiteUrl(`/en${suffix}`);
  const ar=absoluteSiteUrl(`/ar${suffix}`);
  const socialTitle=absoluteTitle?title:locale==="ar"?`${title} | كوفونيلي`:`${title} | KOVUNELI`;
  return {
    title:absoluteTitle?{absolute:title}:title,
    description,
    ...(canonical&&en&&ar?{alternates:{canonical,languages:{en,ar}}}:{}),
    openGraph:{title:socialTitle,description,type:"website",locale:locale==="ar"?"ar_QA":"en_QA",siteName:locale==="ar"?"كوفونيلي":"KOVUNELI",...(canonical?{url:canonical}:{})},
    twitter:{card:"summary",title:socialTitle,description}
  };
}
