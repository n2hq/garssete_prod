import { DefineRoutesFunction } from '@remix-run/dev/dist/config/routes';

export function setupRoutes(defineRoutes: DefineRoutesFunction) {
    return defineRoutes((route) => {
        route("/", "routes/_index.tsx");

        route("/api/listings/search", "routes/api/listings/search.tsx");
        route("/api/listings/featured_listing", "routes/api/listings/featured_listing.tsx");
        route("api/listings/listing_by_category/:category/:limit", "routes/api/listings/listing_by_category.tsx");

    });
}