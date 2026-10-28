import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteLayout } from "@/components/site/layout";
import appCss from "../styles.css?url";

const APP_NAME = "Richard Nuñez Artist";
const SITE_URL = "https://richardnunezartist.com";

export const Route = createRootRoute({
  head: () => ({
    <script defer src="https://cloud.umami.is/script.js" data-website-id="43fad1dd-bc76-4f0b-8958-9cb8e649af63"></script>
    meta: [
      { charSet: "utf-8" },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },

      {
        title: APP_NAME,
      },

      {
        name: "description",
        content:
          "Official studio of Richard Nuñez — self-taught Dallas painter of icons, live acrylic, and Richard Nuñez Art charity work.",
      },

      {
        name: "robots",
        content: "index, follow",
      },

      {
        name: "googlebot",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },

      {
        name: "theme-color",
        content: "#0c0a09",
      },

      // Open Graph
      {
        property: "og:type",
        content: "website",
      },

      {
        property: "og:site_name",
        content: APP_NAME,
      },

      {
        property: "og:title",
        content: APP_NAME,
      },

      {
        property: "og:description",
        content:
          "Official studio of Richard Nuñez — self-taught Dallas painter of icons, live acrylic, and Richard Nuñez Art charity work.",
      },

      {
        property: "og:url",
        content: SITE_URL,
      },

      {
        property: "og:locale",
        content: "en_US",
      },

      // Twitter / X
      {
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        name: "twitter:title",
        content: APP_NAME,
      },

      {
        name: "twitter:description",
        content:
          "Official studio of Richard Nuñez — self-taught Dallas painter of icons, live acrylic, and Richard Nuñez Art charity work.",
      },
    ],

    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },

      {
        rel: "stylesheet",
        href: appCss,
      },

      {
        rel: "manifest",
        href: "/__grok/manifest.webmanifest",
      },

      {
        rel: "apple-touch-icon",
        href: "/__grok/icon-180.png",
      },

      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap",
      },
    ],

    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-6FJN4MDZM9",
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-6FJN4MDZM9');
        `,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Richard Nuñez",
          url: SITE_URL,
          jobTitle: "Artist",
          description:
            "Self-taught Dallas artist specializing in painting, live acrylic work, commissions, and charity events.",
        }),
      },
    ],
  }),

  notFoundComponent: NotFoundPage,

  component: () => (
    <html
      lang="en"
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>

      <body className="bg-ink text-paper">
        <PreviewHostBridge />

        <AuthProvider>
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        </AuthProvider>

        <Scripts />
      </body>
    </html>
  ),
});

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[75dvh] max-w-5xl flex-col justify-center px-5 pb-20 pt-52 md:px-8">
      <p className="text-xs tracking-[0.3em] text-gilt uppercase">
        404
      </p>

      <h1 className="mt-3 font-display text-5xl leading-tight md:text-7xl">
        Page not found.
      </h1>

      <p className="mt-5 max-w-xl text-lg text-paper-dim">
        The page you were looking for does not exist or may have moved.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 w-fit items-center bg-gilt px-6 text-xs tracking-[0.2em] text-ink uppercase transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        Return to atelier
      </Link>
    </main>
  );
}
