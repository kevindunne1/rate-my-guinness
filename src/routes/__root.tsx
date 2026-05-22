import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
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
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-stout hover:opacity-90"
        >
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
        <p className="mt-2 text-sm text-muted-foreground">
          Try again in a moment.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-stout"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

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