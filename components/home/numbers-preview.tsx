import { Container } from "@/components/layout/container";
const stats=[["1851","Timeline begins"],["10","MVP projects / programmes"],["3","Leadership profiles"],["100%","Public facts source-gated"]] as const;
export function NumbersPreview(){return <section className="qa-numbers"><Container><p className="qa-eyebrow">QATAR ATLAS · MVP</p><h2>Built for traceability.</h2><div className="qa-stat-grid">{stats.map(([n,label])=><div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div></Container></section>}
