"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/text/Text";
import {sectionItems} from "@/data/catalogSectionHelperData";
import {useCatalogSectionsPage} from "@/app/catalog/page.hooks";
import Table from "@/components/organisms/table/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import {FiPlus} from "react-icons/fi";

const CatalogSectionsPage = () => {

    const {
        published, getSectionsQuery,
        sortableSections, handlePublish, handleItemClick,
        handleDragEnd, ...context
    } = useCatalogSectionsPage()

    const buttonCV : ClassValue[] = [
        "flex flex-row items-center gap-2 bg-second-light-blue",
        "text-main-black hover:bg-main-blue hover:text-main-white"
    ]

    if (getSectionsQuery.isLoading) {
        return (
            <div>
                Loading..
            </div>
        )
    }

    if (getSectionsQuery.isSuccess) {
        return (
            <>
                <HeaderRow
                    header={"Каталог"}
                    rightContent={
                        <div className={"flex flex-row items-center gap-5"}>
                            <Button
                                buttonText={"Изменить порядок"}
                                onClick={context.handleChangeOrder}
                            />
                            <Button
                                icon={<FiPlus size={"18px"}/>}
                                className={cn(buttonCV)}
                                buttonText={"Добавить раздел"}
                                onClick={context.handleAddSection}
                            />
                        </div>
                    }
                />
                <Table
                    draggable
                    handleDragEnd={handleDragEnd}
                    tableHeader={sectionItems}
                    onItemClick={handleItemClick}
                    tableContent={sortableSections}
                />
            </>
        );
    }

};

export default CatalogSectionsPage;
