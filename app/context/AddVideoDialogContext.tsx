import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { saveVideo } from "~/lib/lib";
import { AddVideoType } from "~/lib/types";

const AddVideoDialogContext = createContext<any | null>(null)

export function useAddVideoDialogContext() {
    const context = useContext(AddVideoDialogContext)
    /* if (!context) {
        throw new Error("useAddPhotoDialogContext must be used within an AuthProvider")
    } */
    return context
}




const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/

export const AddVideoSchema = z.object({
    videolink: z.string({ message: "Please enter the video link" }),
    url: z.string().url("Video link is not valid."),

    videotitle: z.string({ message: "Please enter a password" })
        .min(8, "Password must be at least 8 characters")
        .regex(password_regex, "Please enter a valid password"),

    videodescription: z.string()
        .trim()
        .max(500, "Description must be less than 500 characters.")
        .optional()

})

export default AddVideoSchema

export function AddVideoDialogProvider({ children }: any) {
    const [working, setWorking] = useState<any>(false)
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const [userGuid, setUserGuid] = useState<any>(null)
    const [businessGuid, setBusinessGuid] = useState<any>(null)
    const [isImgSelected, setIsImageSelected] = useState<any>(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const notification = useNotification()
    const [video, setVideo] = useState<any | null>(null)
    const [videoIframe, setVideoIframe] = useState<any | null>(null)
    const [videoVerified, setVideoVerified] = useState(false)
    const [videoUrlState, setVideoUrlState] = useState(false)
    const [videoUrlObject, setVideoUrlObject] = useState<any | undefined>(undefined)
    const [videoUrlValue, setVideoUrlValue] = useState('')



    useEffect(() => {
        if (dialog) {
            {/** reset all states */ }
            setVideoVerified(false)
            setVideoUrlState(false)
            setVideoUrlObject(undefined)
            setVideoUrlValue('')
        }
    }, [dialog])

    useEffect(() => {
        if (videoUrlValue && videoUrlValue.trim().length > 0) {
            setVideoVerified(false);  // reset verify state
            setVideoUrlState(true);   // allow verify button
        } else {
            setVideoVerified(false);
            setVideoUrlState(false);  // disable verify if empty
        }
    }, [videoUrlValue]);

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
    }

    useEffect(() => {
        const videoUrlObject: any | undefined = document.getElementById("videolink")
        setVideoUrlObject(videoUrlObject)
    }, [])

    useEffect(() => {

        if (videoUrlObject?.value.trim().length > 0) {
            setVideoUrlState(true)
        }
    }, [videoUrlObject])

    const handleVerify = () => {
        const videoUrl: any = document.getElementById("videolink")

        getVideoInfo(videoUrl.value)
    }

    async function checkYouTubeVideo(videoId: string) {
        const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Video not found");
            const data = await res.json();
            //console.log("✅ Video exists:", data.title);
            return true;
        } catch (err) {
            console.error("❌ Invalid or unavailable video");
            return false;
        }
    }

    const getVideoInfo = async (videoUrl: any) => {

        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(regex);
        let videoId = match ? match[1] : null;
        let thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`
        let videoObject = {
            videoId: videoId,
            videoUrl: videoUrl,
            videoThumbnail: thumbnail
        }

        const isLoaded = await checkYouTubeVideo(videoId)

        if (isLoaded) {

            try {
                setVideo(videoObject)
                setVideoVerified(true)
                {/** refresh the iframe */ }
                const ytvideoIframe: any = document.getElementById('yt-iframe')
                ytvideoIframe.src = `https://www.youtube.com/embed/${videoObject?.videoId}`

            } finally {

                notification.cancel()
            }

        } else {

            notification.alertCancel("Video error!", "Video could not be loaded!")

        }


        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVideo(videoObject)
    }

    {/** load the iframe */ }
    useEffect(() => {
        const iframe = document.getElementById("yt-iframe")
        if (iframe?.onload) {
            console.log("✅ Iframe page loaded");
        }
        setVideoIframe(iframe)
    }, [])

    const handleVideoUrlKeyUp = (urlString: string) => {

        setVideoUrlValue(urlString);
    }


    const handleUpload = async () => {

        setWorking(true)
        notification.notify('Submitting...')

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let videoLinkState: any = document.getElementById("videolink")
        let videoTitleState: any = document.getElementById("videotitle")
        let videoDescriptionState: any = document.getElementById("videodescr")

        let videoLink = videoLinkState.value;
        let videoTitle = videoTitleState.value;
        let videoDescription = videoDescriptionState.value;




        if (videoLink.trim().length <= 0) {
            notification.alertCancel("Submission error!", "Enter a Video link!")
            setWorking(false)
            return false
        }

        if (videoTitle.trim().length <= 0) {
            notification.alertCancel("Submission error!", "Video title should not be empty!")
            setWorking(false)
            return false
        }

        if (videoDescription.trim().length > 500) {
            notification.alertCancel("Submission error!", "Video description should not be more than 500 characters!")
            setWorking(false)
            return false
        }

        const video: AddVideoType = {
            video_url: videoLink,
            video_title: videoTitle,
            video_description: videoDescription,
            user_guid: userGuid,
            business_guid: businessGuid,
            video_guid: ""
        }

        const result = await saveVideo(video);

        if (result?.data.videoInsertId) {
            notification?.alertReload("Completed", "Video Link Submitted Successfully.")
        } else {
            notification?.alertCancel("Submission Error", "Video Link submission failed.")
        }



        //handleVerify()
        //await new Promise((resolve) => setTimeout(resolve, 1000));

    }



    let vals = {
        dialog, setDialog,
        imgSrc, setImgSrc,
        handleCloseDialog,
        userGuid, setUserGuid,
        businessGuid, setBusinessGuid,
        isImgSelected, setIsImageSelected,
        selectedFile, setSelectedFile
    }


    return (
        <AddVideoDialogContext.Provider value={vals}>
            {
                dialog &&
                <div

                    className={`flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30 rounded-[8px]
                place-content-center place-items-center overflow-hidden`}>

                    <div className={`relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-x-hidden overflow-y-hidden z-[3000]`}
                        onClick={(event) => {
                            event.preventDefault()
                        }}
                    >
                        <div className={`relative h-full overflow-y-auto`}>
                            <div className={`relative w-full h-[75%] max-h-[75%] bg-black`}>
                                <div className={` relative w-full h-full`}>
                                    <iframe id="yt-iframe"
                                        src={video?.videoId ? `https://www.youtube.com/embed/${video?.videoId}` : undefined}
                                        className="absolute top-0 left-0 w-full h-full"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    >
                                    </iframe>
                                </div>
                            </div>

                            {/** video link */}
                            <div className={`flex mb-1 `}>
                                <input
                                    id="videolink"
                                    type="text"
                                    placeholder="Enter Video Link"
                                    className={`w-full bg-gray-100 px-3 py-4 `}
                                    onKeyUp={(e: any) => {
                                        handleVideoUrlKeyUp(e.target.value);
                                    }}
                                />


                            </div>

                            {/** video title */}

                            <div className={`flex mb-1 `}>
                                <input
                                    id="videotitle"
                                    type="text"
                                    placeholder="Enter Video Title"
                                    className={`w-full bg-gray-100 px-3 py-4 `}
                                />

                            </div>

                            { /** description */}
                            <div>
                                <textarea
                                    id='videodescr'
                                    placeholder={`Enter picture description.`}
                                    className={`w-full bg-gray-100 px-3  h-[60px] py-3`}
                                ></textarea>
                            </div>

                            <div className={`flex place-content-end px-3 gap-2`}>
                                <button
                                    onMouseDown={() => handleCloseDialog()}
                                    className={`bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleUpload()}

                                    className={`bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4 ${!videoVerified ? 'hidden' : 'block'}`}
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => handleVerify()}
                                    disabled={videoUrlState ? false : true}
                                    className={`${videoUrlState ? 'bg-blue-800' : 'bg-blue-300'} ${videoVerified && 'hidden'} text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`}
                                >
                                    Verify
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            }
            {children}
        </AddVideoDialogContext.Provider>
    )
}