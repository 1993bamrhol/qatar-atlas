import type {MetadataRoute} from "next";
import {leaders} from "@/data/leadership";
import {projects} from "@/data/projects";

function siteBase(){
  const explicit=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,"");
  if(explicit)return explicit;
  const vercel=process.env.VERCEL_PROJECT_PRODUCTION_URL||process.env.VERCEL_URL;
  return vercel?`https://${vercel.replace(/\/$/,"")}`:"";
}

export default function sitemap():MetadataRoute.Sitemap{
  const base=siteBase();
  if(!base)return [];
  const staticRoutes=["","leadership","projects","timeline","connections","map","methodology","sources"];
  const entries:MetadataRoute.Sitemap=[];
  for(const locale of ["en","ar"] as const){
    for(const route of staticRoutes){
      entries.push({url:`${base}/${locale}${route?"/"+route:""}`,changeFrequency:"weekly",priority:route?0.8:1});
    }
    for(const person of leaders){
      entries.push({url:`${base}/${locale}/leadership/${person.slug}`,changeFrequency:"monthly",priority:0.7});
    }
    for(const project of projects){
      entries.push({url:`${base}/${locale}/projects/${project.slug}`,changeFrequency:"monthly",priority:0.7});
    }
  }
  return entries;
}
