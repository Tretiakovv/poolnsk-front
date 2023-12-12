import type {Metadata} from 'next'
import {Montserrat} from 'next/font/google'
import './globals.css'
import GridWrapper from "@/components/wrappers/GridWrapper";
import NavigationSidebar from "@/components/organisms/left-sidebar/NavigationSidebar";

const inter = Montserrat({subsets: ['cyrillic']})

export const metadata: Metadata = {
    title: 'POOLNSK'
}

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <GridWrapper className={"grid grid-cols-15 gap-x-5 gap-y-[30px]"}>
                    <NavigationSidebar />
                    {children}
                </GridWrapper>
            </body>
        </html>
    )
}

export default RootLayout
