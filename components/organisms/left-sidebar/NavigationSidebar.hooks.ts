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
        return <TextLinkItem>sidebarTabData.find((item) => {
            const lastSlashIndex = item.link.lastIndexOf('/')
            const slicedRoute = item.link.slice(0, lastSlashIndex)
            const sublink = slicedRoute !== "" ? slicedRoute : item.link
            return pathName.includes(sublink)
        })
    }

    const activeItem = getActiveItem()

    return {activeItem, handleSelect}

}