import ResponsiveNav from "~/components/header/lite/ResponsiveNav"

export function loader() {
    //throw new Response("Not Found", { status: 404 });
    return null
}

export default function NotFound() {
    return (
        <div>
            <ResponsiveNav theme={'dark'} />
            <div className={`min-h-screen flex items-center justify-center 
        text-center px-4 text-black`}>
                <div className={`flex place-content-center place-items-center gap-3
                h-[50px]`}>
                    <div className={`text-2xl font-bold text-red-600 h-full
                    flex place-items-center`}>
                        404
                    </div>
                    <div className={`h-full w-[2px] border-r`}></div>
                    <div className={`text-black text-[14px]
                    h-full flex place-items-center`}>
                        This page could not be found.
                    </div>
                </div>
            </div>
        </div>
    );
}
