import dotenv from "dotenv";

// Dynamically load the right env file based on NODE_ENV
const envFileMap = {
  test: "./env/.env.test",
  production: "./env/.env.prod",
  development: "./env/.env.dev"
};

dotenv.config({
  path: envFileMap[process.env.NODE_ENV] || "./env/.env.prod"
});

import { createRequestHandler } from "@remix-run/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";


const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
    : await import("./build/server/index.js"),
});

const app = express();
//const PORT = 3393;
const port = process.env.PORT || process.env.VITE_PORT || 3000;

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));

// handle SSR requests
app.all("*", remixHandler);

console.log("🔧 Loaded ENV:", process.env.VITE_PORT, process.env.VITE_SITENAME);

//const port = process.env.VITE_PORT || PORT;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
