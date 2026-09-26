import Link from "next/link";import type { ReactNode } from "react";
type Props={children:ReactNode;href?:string;variant?:"primary"|"secondary"};
export function Button({children,href,variant="primary"}:Props){const cls=`qa-button qa-button--${variant}`;return href?<Link className={cls} href={href}>{children}</Link>:<button className={cls}>{children}</button>}
