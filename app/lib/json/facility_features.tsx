import { BiLibrary, BiWine } from "react-icons/bi";
import { BsPersonWheelchair } from "react-icons/bs";
import { FaSwimmingPool, FaWheelchair } from "react-icons/fa";
import { FaToilet, FaWheelchairMove } from "react-icons/fa6";
import { FcAutomotive } from "react-icons/fc";
import { GrCafeteria, GrLounge, GrWheelchairActive } from "react-icons/gr";
import { MdBusinessCenter, MdOutlineWheelchairPickup, MdWheelchairPickup } from "react-icons/md";
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
    },
    {
        name: "Wheelchair Accessible",
        feature_id: "wheelchair_accessible",
        description: "Helps customers for easy navigation",
        icon: <FaWheelchair />
    },
    {
        name: "Wheelchair Accessible Entrance",
        feature_id: "wheelchair_accessible_entrance",
        description: "Helps customers for easy navigation",
        icon: <GrWheelchairActive />
    },
    {
        name: "Wheelchair Accessible Seating",
        feature_id: "wheelchair_accessible_seating",
        description: "Specialised dining experience",
        icon: <MdOutlineWheelchairPickup />
    },
    {
        name: "Wheelchair Accessible Toilet",
        feature_id: "wheelchair_accessible_toilet",
        description: "Specialised convenience for wheelchair uses",
        icon: <BsPersonWheelchair />
    },
    {
        name: "Wheelchair Accessible Car Park",
        feature_id: "wheelchair_accessible_car_park",
        description: "Specialised access for wheelchair uses",
        icon: <MdWheelchairPickup />
    },
    {
        name: "Rest room",
        feature_id: "rest_room",
        description: "Convenience for customers",
        icon: <FaToilet />
    },
    {
        name: "Swimming Pool",
        feature_id: "swimming_pool",
        description: "Swimming Pool",
        icon: <FaSwimmingPool />
    },
    {
        name: "Car Park",
        feature_id: "car_park",
        description: "Car Park",
        icon: <FcAutomotive />
    },
]