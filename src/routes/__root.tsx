import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stout px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-gold">404</h1>
        <h2 className="mt-4 font-serif text-xl text-cream">Pint not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That pour evaporated. Try another page.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-stout hover:opacity-90">
          Back to the bar
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-stout px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-xl text-cream">The tap's jammed.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again in a moment.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-stout"
        >
          Try again
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
      { title: "Rate My Guinness — Every pint tells a story" },
      { name: "description", content: "Upload your pint. Let the judges decide. Community-rated Guinness pours from pubs around the world." },
      { property: "og:title", content: "Rate My Guinness — Every pint tells a story" },
      { property: "og:description", content: "Upload your pint. Let the judges decide. Community-rated Guinness pours from pubs around the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Rate My Guinness — Every pint tells a story" },
      { name: "twitter:description", content: "Upload your pint. Let the judges decide. Community-rated Guinness pours from pubs around the world." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5b9e665a-e44a-4a1d-90d7-a2bfb55c963f/id-preview-15dcd896--0bac0915-c44e-454a-b46d-766e6add077e.lovable.app-1779414026318.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5b9e665a-e44a-4a1d-90d7-a2bfb55c963f/id-preview-15dcd896--0bac0915-c44e-454a-b46d-766e6add077e.lovable.app-1779414026318.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Inter:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
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
      <div className="min-h-screen bg-stout text-cream">
        <Navbar />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
