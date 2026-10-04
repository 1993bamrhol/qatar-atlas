import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {LocaleHeader} from "@/components/layout/locale-header";
import {Container} from "@/components/layout/container";
import {SourceRegistryExplorer} from "@/components/sources/source-registry-explorer";
import {sourceRegistry,sourceRegistryStats} from "@/data/source-registry";
import {isLocale} from "@/lib/i18n";

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  const ar=locale==="ar";
  return {
    title:ar?"سجل المصادر":"Source Registry",
    description:ar
      ?"سجل قابل للتتبع للمصادر العامة المستخدمة في كوفونيلي، مع ربط كل مصدر بالسجلات والأدلة التي يعتمد عليها."
      :"A traceable registry of public sources used by KOVUNELI, linking each source to the records and evidence that depend on it."
  };
}

export default async function SourcesPage({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  const ar=locale==="ar";
  return <>
    <LocaleHeader locale={locale}/>
    <main id="main-content" tabIndex={-1}>
      <section className="qa-page-hero">
        <Container>
          <p className="qa-eyebrow">{ar?"سجل المصادر":"SOURCE REGISTRY"}</p>
          <h1>{ar?"كل دليل يمكن تتبعه إلى مصدره.":"Every evidence trail should lead back to a source."}</h1>
          <p>{ar
            ?"يجمع هذا السجل المصادر العامة التي تستخدمها كوفونيلي عبر ملفات القيادة والمشاريع والعلاقات والخط الزمني والسياق الجغرافي. وهو لا يحول المصدر إلى حقيقة بحد ذاته؛ بل يوضح أين استُخدم وكيف صُنّف الدليل داخل كوفونيلي."
            :"This registry gathers the public sources used across KOVUNELI leadership, projects, relationships, timeline and geographic context. A source is not treated as proof by itself; the registry shows where it is used and how its evidence is classified inside KOVUNELI."}</p>
          <div className="qa-actions">
            <Link className="qa-button qa-button--primary" href={`/${locale}/methodology`}>{ar?"اقرأ المنهجية":"Read methodology"}</Link>
          </div>
        </Container>
      </section>
      <section className="qa-section qa-section--soft">
        <Container>
          <div className="qa-source-stats">
            <div><strong>{sourceRegistryStats.sources}</strong><span>{ar?"مصدرًا فريدًا":"unique sources"}</span></div>
            <div><strong>{sourceRegistryStats.publishers}</strong><span>{ar?"جهات ناشرة":"publishers"}</span></div>
            <div><strong>{sourceRegistryStats.linkedRecords}</strong><span>{ar?"استخدامًا موثقًا":"documented uses"}</span></div>
            <div><strong>{sourceRegistryStats.accessAuditedSources}</strong><span>{ar?"مصدرًا خضع لفحص الوصول · "+sourceRegistryStats.reviewRequiredSources+" يتطلب مراجعة":"sources access-audited · "+sourceRegistryStats.reviewRequiredSources+" require review"}</span></div>
          </div>
        </Container>
      </section>
      <section className="qa-section">
        <Container>
          <div className="qa-source-explainer">
            <article><p className="qa-card-label">{ar?"قابلية التتبع":"TRACEABILITY"}</p><h2>{ar?"المصدر مرتبط بالسجل الذي يستخدمه":"Sources are linked to the records that use them"}</h2><p>{ar?"يمكن أن يدعم المصدر مشروعًا أو ملف قيادة أو علاقة أو محطة زمنية أو سياقًا جغرافيًا. تُعرض هذه الاستخدامات بشكل منفصل حتى لا تختلط الأدوار المختلفة للمصدر.":"A source may support a project, leadership profile, relationship, timeline milestone or geographic context. Those uses are shown separately so different evidence roles do not collapse into one."}</p></article>
            <aside><p className="qa-card-label">{ar?"حدود التوثيق":"DOCUMENTATION BOUNDARY"}</p><h2>{ar?"تاريخ مراجعة السجل ليس تاريخ نشر المصدر":"Record review date is not source publication date"}</h2><p>{ar?"عندما يظهر تاريخ مراجعة، فهو تاريخ مراجعة سجل كوفونيلي المرتبط بالمصدر، وليس ادعاءً عن تاريخ نشر الصفحة الخارجية.":"When a review date appears, it is the KOVUNELI record-review date associated with that source, not a claim about the external page's publication date."}</p><p>{ar?"حالة الوصول إلى المصدر هي ملاحظة مسجلة في تاريخ الفحص الظاهر، وليست ضمانًا بأن الموقع الخارجي سيبقى دون تغيير أو متاحًا باستمرار.":"Source access status is an observation made on the stated check date, not a guarantee that an external website will remain unchanged or continuously available."}</p></aside>
          </div>
          <SourceRegistryExplorer locale={locale} entries={sourceRegistry}/>
        </Container>
      </section>
    </main>
  </>;
}
