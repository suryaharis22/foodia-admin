import { NextResponse } from "next/server";

export default function middleware(req: any) {
  let verify = req.cookies.get("role")?.value;
  const url = req.url;

  if (
    verify !== "corporate" &&
    verify !== "superadmin" &&
    url.includes("/ui-components/pages")
  ) {
    return NextResponse.redirect(new URL("/ui-components/auth/login", req.url));
  }

  return NextResponse.next();
}
