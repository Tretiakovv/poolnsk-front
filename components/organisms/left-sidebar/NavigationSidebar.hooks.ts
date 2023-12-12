import {TextLinkItem} from "@/types/TextLinkItem";
import {usePathname} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {sidebarTabData} from "@/data/sidebarTabData";

export const useNavigationSidebar = () => {

    const pathName = usePathname()
    const router : AppRouterInstance = useRouter()

    const handleSelect = (item : TextLinkItem) => router.push(item.link)

    const getActiveItem = () : TextLinkItem => {
        return sidebarTabData.find((item) =>
            pathName.includes(item.link))!!
    }

    const activeItem = getActiveItem()
    console.log(activeItem)

    return {activeItem, handleSelect}

}