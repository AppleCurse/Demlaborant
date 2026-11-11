import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser();
  const allowed = (process.env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase());
  const isAdmin = Boolean(user?.email && allowed.includes(user.email.toLowerCase()));

  if (request.nextUrl.pathname === "/admin/login" && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login" && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
