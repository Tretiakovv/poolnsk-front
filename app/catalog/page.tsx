"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/text/Text";
import {sectionItems} from "@/data/catalogSectionHelperData";
import {useCatalogSectionsPage} from "@/app/catalog/page.hooks";
import Table from "@/components/organisms/table/Table";

const CatalogSectionsPage = () => {

    const {
        published, getSectionsQuery,
        sortableSections, handlePublish, handleItemClick,
        handleDeleteClick, handleEditClick, handleDragEnd
    } = useCatalogSectionsPage()

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
                        <div className={"flex flex-row items-center gap-[20px]"}>
                            {
                                published && <Text
                                    className={"text-right text-indicator-new text-[14px]"}
                                    text={"Все изменения опубликованы"}
                                />
                            }
                            <Button
                                buttonText={"Опубликовать"}
                                onClick={handlePublish}
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
