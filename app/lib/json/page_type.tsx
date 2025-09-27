import { BiBuilding } from "react-icons/bi";
import { CgBandAid } from "react-icons/cg";
import { FaBuildingNgo } from "react-icons/fa6";
import { FcBusinessman } from "react-icons/fc";
import { GiFemaleLegs } from "react-icons/gi";
import { MdMusicNote } from "react-icons/md";
import { RiCommunityFill } from "react-icons/ri";

export const pageType = [
    {
        name: "Local Business or Place",
        id: "local_business",
        icon: <FcBusinessman size={20} />
    },
    {
        name: "Company, Organization or Institution",
        id: "company_organization_institution",
        icon: <BiBuilding size={20} />
    },
    {
        name: "Non-Governmental Organization",
        id: "ngo",
        icon: <FaBuildingNgo size={20} />
    },
    {
        name: "Artist, Band or Public Figure",
        id: "artist_band_public_figure",
        icon: <CgBandAid size={20} />
    },
    {
        name: "Entertainment",
        id: "entertainment",
        icon: <MdMusicNote size={20} />
    },
    {
        name: "Cause or Community",
        id: "cause_or_community",
        icon: <RiCommunityFill size={20} />
    },
]