import {describe,expect,it} from "vitest";
import {isLocale,switchLocalePath} from "@/lib/i18n";

describe("localized routing helpers",()=>{
  it("accepts only supported locales",()=>{
    expect(isLocale("en")).toBe(true);
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("english")).toBe(false);
  });

  it("preserves the route path when switching locale",()=>{
    expect(switchLocalePath("/en/sources","en")).toBe("/ar/sources");
    expect(switchLocalePath("/ar/projects/doha-metro","ar")).toBe("/en/projects/doha-metro");
  });

  it("preserves the existing root and unprefixed boundary behavior",()=>{
    expect(switchLocalePath("/en","en")).toBe("/ar");
    expect(switchLocalePath("/sources","en")).toBe("/ar/sources");
    expect(switchLocalePath("/english/sources","en")).toBe("/ar/english/sources");
  });
});
