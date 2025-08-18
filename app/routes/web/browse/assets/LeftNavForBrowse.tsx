import React from 'react'
import { BiFoodMenu, BiLandscape } from 'react-icons/bi'
import { CgAirplane, CgChart, CgFeed, CgPrinter, CgShoppingBag, CgShoppingCart } from 'react-icons/cg'
import { FaSchool } from 'react-icons/fa6'
import { FcAutomotive, FcLandscape } from 'react-icons/fc'
import { GiHealthNormal, GiHumanTarget, GiTravelDress } from 'react-icons/gi'
import { GrCloudComputer, GrLanguage, GrRestaurant } from 'react-icons/gr'
import { MdAdsClick, MdCleaningServices, MdConstruction, MdDashboard, MdElectricalServices, MdMeetingRoom, MdModeOfTravel, MdPlumbing, MdRealEstateAgent, MdRoomService } from 'react-icons/md'
import { RiGovernmentFill, RiLandscapeLine } from 'react-icons/ri'
import { TbTruckDelivery } from 'react-icons/tb'
import { leftNavLinks } from '~/lib/json'




const LeftNavForBrowse = () => {
    return (
        <div className={`space-y-5`}>
            {
                leftNavLinks?.sort((a, b) =>
                    a.name.localeCompare(b.name)
                )?.map((nav: any, index: number) => {
                    return (
                        <div key={index}>
                            <a href={`/web/browse?q=${nav?.id}`}>
                                <div
                                    key={index}
                                    className={`flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer`}
                                >

                                    <div className={`w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full`}>
                                        {nav?.icon}
                                    </div>
                                    <div className={`text-lg`}>
                                        {nav?.name}
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LeftNavForBrowse
