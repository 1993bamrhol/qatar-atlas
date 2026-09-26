import type { ReactNode } from "react";
export function Container({children,className=""}:{children:ReactNode;className?:string}){return <div className={`qa-container ${className}`}>{children}</div>}
