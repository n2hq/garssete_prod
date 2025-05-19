import { DefineRoutesFunction } from '@remix-run/dev/dist/config/routes';

export function setupRoutes(defineRoutes: DefineRoutesFunction) {
    return defineRoutes((route) => {
        route("/", "routes/_index.tsx");
        route("/:id", "routes/listing/index.tsx");


        route("api/listing/:guid_or_username", "routes/api/listing/listing.tsx");
        route("api/listing/search", "routes/api/listing/search.tsx");
        route("api/listing/featured_listing", "routes/api/listing/featured_listing.tsx");
        route("api/listing/business_facility_features/:business_guid", "routes/api/listing/business_facility_features.tsx");
        route("api/listing/listing_by_category/:category/:limit", "routes/api/listing/listing_by_category.tsx");
        route("api/listing/business_gallery/:business_guid", "routes/api/listing/business_gallery.tsx");
        route("api/listing/business_profile_image/:guid", "routes/api/listing/business_profile_image.tsx");

        route("api/rating/business_ratings/:business_guid", "routes/api/rating/business_ratings.tsx");
        route("api/rating/ratings_reviews/:business_guid", "routes/api/rating/ratings_reviews.tsx");

        route("*", "routes/_404.tsx");
    });
}