import {describe,expect,it} from "vitest";
import {resolveSourceUrlAlias} from "@/data/source-health";
import {sourceRegistry} from "@/data/source-registry";

const legacy="https://www.mcit.gov.qa/en/nda";
const canonical="https://www.mcit.gov.qa/en/about-us/digital-agenda-2030";
const unrelated="https://www.mcit.gov.qa/en/artificial-intelligence-committee/";

describe("source URL identity",()=>{
  it("resolves only the explicit Digital Agenda legacy alias",()=>{
    expect(resolveSourceUrlAlias(legacy)).toBe(canonical);
    expect(resolveSourceUrlAlias(canonical)).toBe(canonical);
    expect(resolveSourceUrlAlias(unrelated)).toBe(unrelated);
  });

  it("keeps one canonical Digital Agenda Source Registry identity",()=>{
    expect(sourceRegistry.filter(entry=>entry.url===canonical)).toHaveLength(1);
    expect(sourceRegistry.some(entry=>entry.url===legacy)).toBe(false);
  });

  it("collapses legacy and canonical URLs before identity aggregation",()=>{
    const identities=new Map<string,number>();
    for(const url of [legacy,canonical]){
      const identity=resolveSourceUrlAlias(url);
      identities.set(identity,(identities.get(identity)??0)+1);
    }
    expect([...identities.keys()]).toEqual([canonical]);
    expect(identities.get(canonical)).toBe(2);
  });
});
