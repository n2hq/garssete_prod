import { DefineRoutesFunction } from '@remix-run/dev/dist/config/routes';

export function setupRoutes(defineRoutes: DefineRoutesFunction) {
    return defineRoutes((route) => {
        route("/", "routes/_index.tsx");
        route("/:id", "routes/listing/index.tsx");
        route("/web/search", "routes/web/search/index.tsx");
        route("/web/signin", "routes/web/signin/index.tsx");
        route("/web/signup", "routes/web/signup/index.tsx");
        route("/web/reset_password", "routes/web/reset_password/index.tsx");
        route("/web/account", "routes/web/account/index.tsx");
        route("/web/account/profile", "routes/web/account/profile/index.tsx");
        route("/web/account/email_address", "routes/web/account/email_address/index.tsx");
        route("/web/account/change_password", "routes/web/account/change_password/index.tsx");
        route("/web/account/reset_password", "routes/web/account/reset_password/index.tsx");
        route("/web/account/deactivate_profile", "routes/web/account/deactivate_profile/index.tsx");

        {/** user */ }
        route("api/user/signin", "routes/api/user/signin.tsx");
        route("api/user/verifytoken", "routes/api/user/verifytoken.tsx");
        route("api/user/:guid", "routes/api/user/user.tsx");

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