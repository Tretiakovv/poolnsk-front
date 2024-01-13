"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import {sectionItems} from "@/data/catalogSectionHelperData";
import {useCatalogSectionsPage} from "@/app/catalog/page.hooks";
import Table from "@/components/organisms/table/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utils/cn";
import {FiPlus} from "react-icons/fi";
import React from "react";
import InfoActionPopup from "@/components/organisms/popups/info-action-popup/InfoActionPopup";

const CatalogSectionsPage = () => {

    const {
        getSectionsQuery,
        sortableSections, handleItemClick,
        handleDragEnd, ...context
    } = useCatalogSectionsPage()

    const buttonCV: ClassValue[] = [
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
                {
                    context.itemToDelete && <InfoActionPopup
                        header={"Удаление раздела"}
                        message={"Вы уверены, что хотите удалить раздел? Это действие нельзя отменить."}
                        buttonText={"Удалить раздел"}
                        onClose={() => context.setItemToDelete(undefined)}
                        action={context.handleDeleteClick}
                        snackbarProps={{
                            isOpen: context.deleteError,
                            onClose: () => context.setDeleteError(false),
                            message: "Чтобы удалить раздел, сначала удалите все категории в нём."
                        }}
                    />
                }
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
                    editableProps={{
                        onDelete: context.setItemToDelete,
                        onEdit: (item) => console.log("EDIT", item)
                    }}
                />
            </>
        );
    }

};

export default CatalogSectionsPage;
