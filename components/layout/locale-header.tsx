"use client";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Container} from "./container";
import {NAV_ITEMS} from "@/lib/constants";
import {getDictionary} from "@/lib/dictionary";
import {switchLocalePath} from "@/lib/i18n";
import type {Locale} from "@/types";

export function LocaleHeader({locale}:{locale:Locale}){
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const d=getDictionary(locale);
  const other:Locale=locale==="en"?"ar":"en";
  const switchHref=switchLocalePath(pathname,locale);
  const menuLabel=locale==="ar"?(open?"إغلاق القائمة":"فتح القائمة"):(open?"Close menu":"Open menu");
  return <><a className="qa-skip-link" href="#main-content">{locale==="ar"?"تجاوز إلى المحتوى":"Skip to content"}</a><header className="qa-header">
    <Container className="qa-nav">
      <Link href={`/${locale}`} className="qa-brand" aria-label={locale==="ar"?"أطلس قطر · الرئيسية":"Qatar Atlas · Home"}>
        <span>{d.brand}</span><span>{d.brandAlt}</span>
      </Link>
      <button className="qa-menu-toggle" type="button" aria-expanded={open} aria-controls="qa-primary-nav" aria-label={menuLabel} onClick={()=>setOpen(v=>!v)}>
        <span aria-hidden="true">{open?"×":"☰"}</span>
      </button>
      <nav id="qa-primary-nav" className={open?"is-open":""} aria-label={locale==="ar"?"التنقل الرئيسي":"Primary navigation"}>
        {NAV_ITEMS.map(item=>{const href=`/${locale}/${item}`;const active=pathname===href||pathname.startsWith(href+"/");return <Link key={item} href={href} aria-current={active?"page":undefined} onClick={()=>setOpen(false)}>{d.nav[item]}</Link>})}
      </nav>
      <div className="qa-language"><Link href={switchHref} hrefLang={other} aria-label={locale==="ar"?"Switch to English":"التبديل إلى العربية"}>{other==="ar"?"AR":"EN"}</Link></div>
    </Container>
  </header></>;
}
