import Link from "next/link";
import "./globals.css";

export default function NotFound(){
  return <main className="qa-not-found">
    <div>
      <p className="qa-eyebrow">404 · غير موجود</p>
      <h1>Page not found<br/>الصفحة غير موجودة</h1>
      <p>The requested Qatar Atlas record or route could not be found.<br/>تعذر العثور على سجل أو مسار أطلس قطر المطلوب.</p>
      <div className="qa-actions">
        <Link className="qa-button qa-button--primary" href="/en">English home</Link>
        <Link className="qa-button qa-button--secondary" href="/ar">الرئيسية العربية</Link>
      </div>
    </div>
  </main>;
}
