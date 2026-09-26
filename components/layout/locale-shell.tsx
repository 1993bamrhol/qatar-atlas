"use client";
import {useEffect} from "react";import type {Locale} from "@/types";
export function LocaleShell({locale,children}:{locale:Locale;children:React.ReactNode}){useEffect(()=>{document.documentElement.lang=locale;document.documentElement.dir=locale==="ar"?"rtl":"ltr"},[locale]);return <div lang={locale} dir={locale==="ar"?"rtl":"ltr"} className={locale==="ar"?"qa-locale qa-locale--ar":"qa-locale"}>{children}</div>}
