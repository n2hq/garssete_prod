// app/components/AdComponent.tsx
import { useEffect } from "react";
import { adInfo } from "~/lib/json";

export function TopAd() {
    useEffect(() => {
        if (import.meta.env.VITE_ENV === "prod") {
            try {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error("AdSense error:", e);
            }
        }
    }, []);

    if (import.meta.env.VITE_ENV !== "prod") {
        return null; // Don't render ads in development
    }

    return (
        <div
            className={`max-w-[1000px] min-h-[90px] bg-blue-50
                mx-auto w-full mt-4 flex place-items-center 
                place-content-center font-light text-[14px]
                `}
        >Ads by google
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={adInfo.clientId}
                data-ad-slot={adInfo.adslot}
                data-ad-format={adInfo.format}
                data-full-width-responsive={adInfo.responsive}
            ></ins>
        </div>
    );
}
