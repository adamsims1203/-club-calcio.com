import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Navbar, links as navbarLinks } from "~/components/navbar";
import globalStyles from "~/styles/global.css";

export const meta = () => ({
  charset: "utf-8",
  title: "CALCIO!",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [
    { rel: "icon", href: "/assets/favicon.svg", type: "image/svg" },
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
    ...navbarLinks(),
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />

        <a href="/">
          <img
            className="home-logo"
            src="/assets/calcio-logo.svg"
            alt="CALCIO! logo"
          />
        </a>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
