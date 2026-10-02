import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { CartProvider } from "../context/CartContext";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F5] px-4 font-sans text-[#2A1D1A]">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#E2527D] font-display">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-[#2A1D1A] font-display">Page not found</h2>
        <p className="mt-2 text-sm text-[#7D6B65]">
          The sweet page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#E2527D] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#C93B66]"
          >
            Back to Home 🍦
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F5] px-4 font-sans text-[#2A1D1A]">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold font-display text-[#2A1D1A]">
          Oops! Something melted
        </h1>
        <p className="mt-2 text-sm text-[#7D6B65]">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#E2527D] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#C93B66]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#D7CCC8] bg-white px-5 py-2.5 text-sm font-medium text-[#2A1D1A] transition-all hover:bg-[#FCE7EC]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Delicious Scoops | Premium Ice Cream Parlour" },
      {
        name: "description",
        content:
          "Life is Better with Ice Cream. Real ingredients, extraordinary flavours crafted fresh daily at Delicious Scoops.",
      },
      { property: "og:site_name", content: "Delicious Scoops" },
      { property: "og:title", content: "Delicious Scoops | More Than Ice Cream" },
      {
        property: "og:description",
        content:
          "Real ingredients. Extraordinary flavours. Made to make your moments sweeter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
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
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </CartProvider>
    </QueryClientProvider>
  );
}
