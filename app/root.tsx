import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { useEffect } from "react";
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { NotificationProvider } from "./context/NotificationContext";
import { AuthProvider } from "./context/AuthContext";
import { SliderProvider } from "./context/SliderContext";
import { AddPhotoDialogProvider } from "./context/AddPhotoDialogContext";
import { EditPhotoDialogProvider } from "./context/EditPhotoDialogContext";


export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];


export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()

  useEffect(() => {


    NProgress.start()

    const holdWait = async () => {
      await new Promise((resolve) => setTimeout(resolve, 13000));
    }

    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();

      }
    }
  }, [navigation])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-garssete.png" type="image/png" />
        {
          import.meta.env.VITE_ENV === "prod" && (
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              crossOrigin="anonymous"
            ></script>
          )}
        <Meta />
        <Links />
      </head>
      <body>
        <NotificationProvider>
          <SliderProvider>
            <EditPhotoDialogProvider>
              <AddPhotoDialogProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </AddPhotoDialogProvider>
            </EditPhotoDialogProvider>
          </SliderProvider>
        </NotificationProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

