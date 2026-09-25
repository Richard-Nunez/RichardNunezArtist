import {
  createRootRoute,
  HeadContent,
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
    meta: [
      { charSet: "utf-8" },

      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
  name: "msvalidate.01",
  content: "4ED661014A1783D61422F91CA02D7AD6",
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