"use client"

import {Montserrat} from 'next/font/google'
import './globals.css'
import GridWrapper from "@/components/wrappers/grid-wrapper/GridWrapper";
import NavigationSidebar from "@/components/organisms/left-sidebar/NavigationSidebar";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const inter = Montserrat({subsets: ['cyrillic']})

const queryClient = new QueryClient()

const RootLayout = ({children}: { children: React.ReactNode }) => {

    const innerWrapperCV : ClassValue[] = [
        "col-start-4 flex flex-col",
        "col-span-full pr-[30px] py-[30px]"
    ]

    return (
        <html lang="en">
            <body className={inter.className}>
            <QueryClientProvider client={queryClient}>
                <GridWrapper className={"grid grid-cols-15 gap-[30px]"}>
                    <NavigationSidebar />
                    <div className={cn(innerWrapperCV)}>
                        {children}
                    </div>
                </GridWrapper>
            </QueryClientProvider>
            </body>
        </html>
    )
}

export default RootLayout
