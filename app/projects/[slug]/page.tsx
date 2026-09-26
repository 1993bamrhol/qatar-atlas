import {permanentRedirect} from "next/navigation";
export default async function LegacyDetailRedirect({params}:{params:Promise<{slug:string}>}){const {slug}=await params;permanentRedirect("/en/projects/"+slug)}
