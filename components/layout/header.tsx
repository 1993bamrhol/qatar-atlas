import Link from "next/link";
import { Container } from "./container";
import { NAV_ITEMS } from "@/lib/constants";
export function Header(){return <header className="qa-header"><Container className="qa-nav"><Link href="/" className="qa-brand"><span>QATAR ATLAS</span><span lang="ar" dir="rtl">أطلس قطر</span></Link><nav aria-label="Primary navigation">{NAV_ITEMS.map(item=><Link key={item} href={`/${item}`}>{item}</Link>)}</nav><div className="qa-language" aria-label="Language selector"><button type="button">AR</button><span>/</span><button type="button" aria-current="true">EN</button></div></Container></header>}
