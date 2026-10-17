import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import Header from "@/components/demlab/Header";
import Footer from "@/components/demlab/Footer";
import CartDrawer from "@/components/demlab/CartDrawer";
import WhatsAppButton from "@/components/demlab/WhatsAppButton";
import CookieBanner from "@/components/demlab/CookieBanner";
import { CartProvider } from "@/demlab/context/CartContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-serif">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Sayfa bulunamadı</h2>
        <p className="mt-2 text-sm opacity-70">Aradığınız sayfa mevcut değil veya taşınmış.</p>
        <div className="mt-6">
          <Link to="/" className="btn-amber inline-flex rounded-md px-4 py-2 text-sm font-medium">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Sayfa yüklenemedi</h1>
        <p className="mt-2 text-sm opacity-70">Bir hata oluştu. Yenilemeyi deneyin.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="btn-amber mt-6 inline-flex rounded-md px-4 py-2 text-sm font-medium"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DEMLAB | Zanaat, Fermantasyon & Ekstraksiyon Laboratuvarı" },
      { name: "description", content: "Yüksek saflıkta %96'lık laboratuvar çözeltileri ve zanaat hammaddeleri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="oak-body min-h-screen flex flex-col antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Header />
        <CartDrawer />
        <div className="flex-1">
          <Outlet />
        </div>
        <WhatsAppButton />
        <CookieBanner />
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}
