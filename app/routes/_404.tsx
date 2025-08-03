import GenericNav from "~/components/header/generic/GenericNav";
import ResponsiveNav from "~/components/header/lite/ResponsiveNav"
import SearchNavbar from "~/components/header/new/SearchNavbar";

export function loader() {
    //throw new Response("Not Found", { status: 404 });
    return null
}

export default function NotFound() {
    return (
        <div>
            <SearchNavbar />
            <div className={`min-h-screen flex items-center justify-center 
        text-center px-4 text-black fixed top-0 w-full`}>
                <div className={`flex place-content-center place-items-center gap-3
                h-[40px]`}>
                    <div className={`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`}>
                        404
                    </div>
                    <div className={`h-full w-[2px] border-r`}></div>
                    <div className={`text-black text-[14px]
                    h-full flex place-items-center space-x-2`}>
                        <span>
                            Resource not found.
                        </span>
                        <button
                            onClick={() => { window.history.back() }}
                            className={`underline`}>
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
