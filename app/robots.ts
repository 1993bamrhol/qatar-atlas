import type {MetadataRoute} from "next";
import {siteBase} from "@/lib/site-url";

export default function robots():MetadataRoute.Robots{
  const base=siteBase();
  return {rules:{userAgent:"*",allow:"/"},...(base?{sitemap:`${base}/sitemap.xml`,host:base}:{})};
}
