"use client"

import PoolNskLogo from "@/components/svg/poolnsk-logo/PoolNskLogo";
import {sidebarTabData} from "@/data/sidebarTabData";
import SidebarTab from "@/components/atoms/tabs/sidebar-tab/SidebarTab";
import {useNavigationSidebar} from "@/components/organisms/left-sidebar/NavigationSidebar.hooks";
import Button from "@/components/atoms/buttons/button/Button";

const NavigationSidebar = () => {

    const {activeItem, handleSelect} = useNavigationSidebar()

    return (
        <div className={"h-screen bg-main-black flex flex-col py-12 px-8 justify-between col-span-3"}>
            <div className={"flex flex-col gap-11"}>
                <PoolNskLogo/>
                <div className={"flex flex-col gap-5"}>
                    {
                        sidebarTabData.map((item, index) =>
                            <SidebarTab
                                key={index}
                                tab={item}
                                isSelected={activeItem === item}
                                onSelect={() => handleSelect(item)}
                            />
                        )
                    }
                </div>
            </div>
            <Button
                className={"hover:bg-indicator-delete duration-250"}
                buttonText={"Выйти"}
                onClick={() => console.log("Выйти")}
            />
        </div>
    );
};

export default NavigationSidebar;
