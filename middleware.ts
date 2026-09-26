import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request:NextRequest){
  const match=request.nextUrl.pathname.match(/^\/(ar|en)(?:\/|$)/);
  const locale=match?.[1]??"en";
  const headers=new Headers(request.headers);
  headers.set("x-qatar-atlas-locale",locale);
  return NextResponse.next({request:{headers}});
}

export const config={
  matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]
};
