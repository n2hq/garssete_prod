import { BiLibrary, BiWine } from "react-icons/bi";
import { GrCafeteria, GrLounge } from "react-icons/gr";
import { MdBusinessCenter } from "react-icons/md";
import { RiMusic2Line, RiTrademarkLine } from "react-icons/ri";

export const facilityFeatures = [
    {
        name: "Bar",
        feature_id: "bar",
        description: "Enjoy drinks and cocktails",
        icon: <BiWine />
    },
    {
        name: "Cafetaria",
        feature_id: "cafetaria",
        description: "Cafetaria",
        icon: <GrCafeteria />
    },
    {
        name: "Library",
        feature_id: "library",
        description: "Quiet and cosy reading area",
        icon: <BiLibrary />
    },
    {
        name: "Lounge",
        feature_id: "lounge",
        description: "Relax and unwind",
        icon: <GrLounge />
    },
    {
        name: "Music",
        feature_id: "music",
        description: "Live entertainment and sound systems",
        icon: <RiMusic2Line />
    },
    {
        name: "Mini mart",
        feature_id: "mini_mart",
        description: "Shop essentials",
        icon: <RiTrademarkLine />
    },
    {
        name: "Business Center",
        feature_id: "business_center",
        description: "Work, meeting, printing and typesetting",
        icon: <MdBusinessCenter />
    }
]